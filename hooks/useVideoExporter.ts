import { useState, useRef, useEffect } from 'react';
import type { ScriptLine } from '@/store/projectStore';

interface UseVideoExporterProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export type ExportQuality = '720p' | '1080p' | '4k';

interface ExportOptions {
    script: ScriptLine[];
    quality: ExportQuality;
    isPro: boolean;
    title?: string;
}

export function useVideoExporter({ videoRef }: UseVideoExporterProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const isExportingRef = useRef(false);
    const cancelledRef = useRef(false);

    // Audio Context Management
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    const destinationNodeRef = useRef<MediaStreamAudioDestinationNode | null>(null);

    // Cleanup function to close audio context when component unmounts
    useEffect(() => {
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const cancelExport = () => {
        cancelledRef.current = true;
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        isExportingRef.current = false;
        setIsExporting(false);
        setProgress(0);

        const video = videoRef.current;
        if (video) {
            video.pause();
            video.muted = false;

            if (audioContextRef.current && sourceNodeRef.current) {
                try {
                    // Reconnect to speakers (destination)
                    sourceNodeRef.current.connect(audioContextRef.current.destination);
                } catch (e) {
                    console.warn("Could not reconnect to speakers", e);
                }
            }
        }
    };

    const exportVideo = async ({ script, quality = '720p', isPro, title = 'video' }: ExportOptions) => {
        const video = videoRef.current;
        if (!video) {
            setError("Video element not found");
            return;
        }

        setIsExporting(true);
        isExportingRef.current = true;
        cancelledRef.current = false;
        setProgress(0);
        setError(null);

        const originalTime = video.currentTime;
        const originalVolume = video.volume;
        const originalMuted = video.muted;
        const wasPlaying = !video.paused;

        // Resolution settings
        let width = 1280;
        let height = 720;
        if (quality === '1080p') {
            width = 1920;
            height = 1080;
        } else if (quality === '4k') {
            width = 3840;
            height = 2160;
        }

        const canvas = document.createElement('canvas');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = canvas.getContext('2d') as any;
        if (!ctx) {
            setError("Could not create canvas context");
            setIsExporting(false);
            return;
        }

        canvas.width = width;
        canvas.height = height;

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm';

        // --- Audio Setup ---
        try {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioContextClass();
            }
            const audioCtx = audioContextRef.current;

            // Create MediaElementSource only once per video element
            if (!sourceNodeRef.current) {
                try {
                    // Cross-origin issues might prevent this if CORS isn't set on video
                    sourceNodeRef.current = audioCtx.createMediaElementSource(video);
                } catch (e) {
                    console.warn("MediaElementSource already exists or failed", e);
                }
            }

            // Create a new destination for this export session
            const dest = audioCtx.createMediaStreamDestination();
            destinationNodeRef.current = dest;

            if (sourceNodeRef.current) {
                // Disconnect from speakers (destination) if connected
                try {
                    sourceNodeRef.current.disconnect(audioCtx.destination);
                } catch { /* ignore */ }

                // Connect to stream destination
                sourceNodeRef.current.connect(dest);
            }

            const audioTrack = dest.stream.getAudioTracks()[0];
            // -------------------

            const stream = canvas.captureStream(30);
            if (audioTrack) {
                stream.addTrack(audioTrack);
            }

            const mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: quality === '4k' ? 8000000 : 2500000 });
            mediaRecorderRef.current = mediaRecorder;

            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                if (cancelledRef.current) {
                    cleanup();
                    return;
                }

                const blob = new Blob(chunks, { type: 'video/webm' });
                if (blob.size > 0) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;

                    // Format filename: Title_Quality_Date.webm
                    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    const dateStr = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
                    a.download = `${safeTitle}_${quality}_${isPro ? 'pro' : 'free'}_${dateStr}.webm`;

                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else {
                    setError("Export failed: Empty output file");
                }

                cleanup();
            };

            const cleanup = () => {
                setIsExporting(false);
                setProgress(0);
                isExportingRef.current = false;

                // Restore video state
                video.currentTime = originalTime;
                video.volume = originalVolume;
                video.muted = originalMuted;

                // Reconnect audio to speakers
                if (audioContextRef.current && sourceNodeRef.current) {
                    try {
                        // Disconnect from recording destination
                        if (destinationNodeRef.current) {
                            sourceNodeRef.current.disconnect(destinationNodeRef.current);
                        }
                        // Connect back to speakers
                        sourceNodeRef.current.connect(audioContextRef.current.destination);
                    } catch (e) {
                        console.warn("Audio routing cleanup failed", e);
                    }
                }

                if (wasPlaying) {
                    video.play().catch(() => { });
                }
            };

            video.pause();
            video.currentTime = 0;
            video.muted = false;

            // Wait for seek
            await new Promise<void>((resolve) => {
                const handleSeeked = () => {
                    video.removeEventListener('seeked', handleSeeked);
                    resolve();
                };
                video.addEventListener('seeked', handleSeeked);
                if (video.currentTime === 0) {
                    video.removeEventListener('seeked', handleSeeked);
                    setTimeout(resolve, 50);
                } else {
                    setTimeout(() => {
                        video.removeEventListener('seeked', handleSeeked);
                        resolve();
                    }, 1000);
                }
            });

            mediaRecorder.start();

            try {
                await video.play();
            } catch (e) {
                console.error("Export playback failed", e);
                setError("Could not start video playback for export");
                cancelExport();
                return;
            }

            const drawFrame = () => {
                if (!isExportingRef.current) return;

                if (video.ended || (video.duration > 0 && video.currentTime >= video.duration - 0.1)) {
                    console.log("Export finished naturally");
                    mediaRecorder.stop();
                    return;
                }

                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Watermark (Only for Free)
                if (!isPro) {
                    ctx.font = 'bold 24px sans-serif';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.textAlign = 'right';
                    ctx.fillText('CaptionKiln Free', canvas.width - 20, 40);
                }

                // Subtitles
                const currentTime = video.currentTime;
                // find active line
                const currentLine = script.find(
                    (line) => currentTime >= line.startTime && currentTime < line.endTime
                );

                if (currentLine) {
                    const fontSize = quality === '4k' ? 72 : quality === '1080p' ? 48 : 24;
                    ctx.font = `${fontSize}px sans-serif`;
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    const maxWidth = canvas.width * 0.9;
                    const words = currentLine.text.split(' ');
                    let line = '';
                    const lines = [];

                    for (let n = 0; n < words.length; n++) {
                        const testLine = line + words[n] + ' ';
                        const metrics = ctx.measureText(testLine);
                        const testWidth = metrics.width;
                        if (testWidth > maxWidth && n > 0) {
                            lines.push(line);
                            line = words[n] + ' ';
                        } else {
                            line = testLine;
                        }
                    }
                    lines.push(line);

                    const lineHeight = fontSize * 1.2;
                    const startY = canvas.height - (fontSize * 1.5) - (lines.length - 1) * lineHeight;

                    ctx.shadowColor = 'black';
                    ctx.shadowBlur = 4;
                    ctx.lineWidth = fontSize / 6;
                    ctx.strokeStyle = 'black';

                    lines.forEach((l, i) => {
                        const y = startY + (i * lineHeight);
                        ctx.strokeText(l, canvas.width / 2, y);
                        ctx.shadowBlur = 0;
                        ctx.fillText(l, canvas.width / 2, y);
                        ctx.shadowBlur = 4;
                    });
                }

                if (video.duration > 0) {
                    const rawProg = (video.currentTime / video.duration) * 100;
                    const prog = isNaN(rawProg) ? 0 : Math.min(rawProg, 100);

                    // Throttle updates to avoid state churn
                    setProgress((prev) => {
                        if (Math.floor(prog) > Math.floor(prev)) {
                            console.log(`Export Progress: ${Math.floor(prog)}%`);
                            return prog;
                        }
                        return prev;
                    });
                } else {
                    console.log("Video duration invalid:", video.duration);
                }

                requestAnimationFrame(drawFrame);
            };

            console.log("Starting export loop");
            drawFrame();
        } catch (err: any) {
            console.error("Export Error:", err);
            setError(err.message || "Unknown export error");
            setIsExporting(false);
        }
    };

    return {
        exportVideo,
        isExporting,
        progress,
        error,
        cancelExport
    };
}
