'use client'

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { cn } from '@/lib/utils';
import Controls from './Controls';
import Watermark from './Watermark';
import ScriptViewer from './ScriptViewer';
import SubtitleOverlay from './SubtitleOverlay';
import ExportModal from './ExportModal';
import { type VideoInstance, useProjectStore } from '@/store/projectStore';
import { useVideoExporter, ExportQuality } from '@/hooks/useVideoExporter'; // Assuming this path for the hook

interface VideoPlayerProps {
    video: VideoInstance;
    className?: string;
    autoPlay?: boolean;
    isPro?: boolean;
    onUpgrade?: () => void;
}

export default function VideoPlayer({ video, className, autoPlay = false, isPro = false, onUpgrade }: VideoPlayerProps) {
    const { updateScript } = useProjectStore();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Export Hook
    const { exportVideo, isExporting, progress, error: exportError } = useVideoExporter();

    // Playback State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    // UI State
    const [showControls, setShowControls] = useState(true);
    const [isScriptOpen, setIsScriptOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false); // Export Modal State
    const controlsTimeoutRef = useRef<number | null>(null);

    // Initialization
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        let hls: Hls | null = null;

        const handleLoadedMetadata = () => {
            setDuration(vid.duration);
            if (autoPlay) vid.play();
        };

        const handleTimeUpdate = () => {
            setCurrentTime(vid.currentTime);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        if (Hls.isSupported() && video.type === 'application/x-mpegURL') {
            hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(vid);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) vid.play();
            });
        } else {
            // Standard Video (mp4, webm) or Native HLS (Safari)
            vid.src = video.src;
        }

        vid.addEventListener('loadedmetadata', handleLoadedMetadata);
        vid.addEventListener('timeupdate', handleTimeUpdate);
        vid.addEventListener('play', handlePlay);
        vid.addEventListener('pause', handlePause);

        return () => {
            if (hls) hls.destroy();
            vid.removeEventListener('loadedmetadata', handleLoadedMetadata);
            vid.removeEventListener('timeupdate', handleTimeUpdate);
            vid.removeEventListener('play', handlePlay);
            vid.removeEventListener('pause', handlePause);
        };
    }, [video.src, video.type, autoPlay]);

    // Handlers
    const togglePlay = () => {
        const vid = videoRef.current;
        if (vid) {
            isPlaying ? vid.pause() : vid.play();
        }
    };

    const handleSeek = (time: number) => {
        const vid = videoRef.current;
        if (vid) {
            vid.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        const vid = videoRef.current;
        if (vid) {
            vid.volume = newVolume;
            setVolume(newVolume);
            const shouldBeMuted = newVolume === 0;
            setIsMuted(shouldBeMuted);
            vid.muted = shouldBeMuted;
        }
    };

    const toggleMute = () => {
        const vid = videoRef.current;
        if (vid) {
            const newMuted = !isMuted;
            vid.muted = newMuted;
            setIsMuted(newMuted);
            if (newMuted) {
                setVolume(0);
            } else {
                setVolume(1);
                vid.volume = 1;
            }
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        const vid = videoRef.current;
        if (vid) {
            vid.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    // Auto-hide controls
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            window.clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = window.setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            setShowControls(false);
        }
    };

    const handleExport = () => {
        setIsExportOpen(true);
    };

    const handleExportProcess = async (quality: ExportQuality, isExportPro: boolean) => {
        if (!video.src) return;

        await exportVideo({
            videoSrc: video.src,
            script: video.script,
            quality,
            isPro: isExportPro, // Use the passed flag, usually matching isPro/ExportType
            onProgress: (p) => {
                // Progress handled by hook state
            }
        });
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "group bg-black md:overflow-hidden rounded-xl shadow-2xl flex flex-col 2xl:block relative",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onContextMenu={(e) => e.preventDefault()}
            style={{ containerType: 'inline-size' }}
        >
            {/* Video Container */}
            <div className="relative w-full aspect-video 2xl:aspect-auto 2xl:h-full 2xl:absolute 2xl:inset-0">
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    playsInline
                    onClick={togglePlay}
                    crossOrigin="anonymous"
                />

                {!isPro && <Watermark />}

                {/* Click overlay for play/pause */}
                <div className="absolute inset-0 z-10" onClick={togglePlay} />

                <SubtitleOverlay script={video.script} currentTime={currentTime} />

                {/* Controls Overlay */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent",
                        showControls ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Controls
                        isPlaying={isPlaying}
                        onPlayPause={togglePlay}
                        currentTime={currentTime}
                        duration={duration}
                        onSeek={handleSeek}
                        volume={volume}
                        onVolumeChange={handleVolumeChange}
                        isMuted={isMuted}
                        onToggleMute={toggleMute}
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                        playbackRate={playbackRate}
                        onPlaybackRateChange={handlePlaybackRateChange}
                        onToggleScript={() => setIsScriptOpen(!isScriptOpen)}
                        isScriptOpen={isScriptOpen}
                        onExport={handleExport}
                    />
                </div>
            </div>

            {/* Script Viewer */}
            <ScriptViewer
                script={video.script}
                currentTime={currentTime}
                onSeek={handleSeek}
                isOpen={isScriptOpen}
                onClose={() => setIsScriptOpen(false)}
                onUpdateScript={(newScript) => updateScript(video.id, newScript)}
            />

            {/* Export Modal */}
            <ExportModal
                isOpen={isExportOpen}
                isPro={isPro}
                onClose={() => setIsExportOpen(false)}
                onExportFree={() => {
                    handleExportProcess('720p', false);
                    setIsExportOpen(false);
                }}
                onExportPro={(quality) => {
                    handleExportProcess(quality, true);
                    setIsExportOpen(false);
                }}
                onUpgrade={() => {
                    setIsExportOpen(false);
                    onUpgrade?.();
                }}
            />

            {/* Export Progress Overlay */}
            {isExporting && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur">
                    <div className="w-16 h-16 border-4 border-ember border-t-transparent rounded-full animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Baking Video...</h3>
                    <p className="text-gray-400 mb-4">{Math.round(progress)}%</p>
                    <div className="w-64 h-2 bg-ash rounded-full overflow-hidden">
                        <div
                            className="h-full bg-ember transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {exportError && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur">
                    <p className="text-red-500 mb-4 text-center px-4">{exportError}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-ash border border-white/10 rounded">Dismiss & Reload</button>
                </div>
            )}
        </div>
    );
}
