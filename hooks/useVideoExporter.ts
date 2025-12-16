import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { ScriptLine } from '@/store/projectStore';
import { generateSRT, generateVTT } from '@/lib/subtitleUtils';

export type ExportQuality = '1080p' | '4k' | '720p';

interface ExportOptions {
    videoSrc: string;
    script: ScriptLine[];
    quality: ExportQuality;
    isPro: boolean;
    onProgress?: (progress: number) => void;
}

export function useVideoExporter() {
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const ffmpegRef = useRef(new FFmpeg());

    const loadFFmpeg = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        // Check if already loaded
        if (!ffmpeg.loaded) {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
        }
        return ffmpeg;
    };

    const exportVideo = async ({ videoSrc, script, quality, isPro, onProgress }: ExportOptions) => {
        setIsExporting(true);
        setProgress(0);
        setError(null);

        try {
            const ffmpeg = await loadFFmpeg();

            ffmpeg.on('log', ({ message }) => {
                console.log('[FFmpeg Log]:', message);
            });

            ffmpeg.on('progress', ({ progress, time }) => {
                const p = Math.round(progress * 100);
                setProgress(p);
                onProgress?.(p);
            });

            // 1. Download Video
            console.log('fetching video...');
            const videoData = await fetchFile(videoSrc);
            await ffmpeg.writeFile('input.mp4', videoData);

            // 2. Generate Subtitle File (SRT)
            const srtContent = generateSRT(script);
            // Write to explicit root path
            await ffmpeg.writeFile('/subtitles.srt', srtContent);

            // 3. Load Font
            console.log('Fetching font...');
            const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter-Bold.ttf';
            const fontData = await fetchFile(fontUrl);
            await ffmpeg.writeFile('/Inter-Bold.ttf', fontData);

            // 4. Construct Filters
            // FINAL FIX ATTEMPT:
            // 1. Use absolute paths in the filter string.
            // 2. Removing 'fontsdir=/' to rely on explicit fontfile path in style if needed, 
            //    or just let it fail back to defaults (the error was opening the SRT, not the font).
            // 3. Quote the filename: subtitles='/subtitles.srt'

            // Note: force_style is removed to ensure basic functionality first.
            const subtitleFilter = "subtitles='/subtitles.srt'";

            let filterComplex = subtitleFilter;

            // Watermark (Free Plan)
            if (!isPro) {
                const watermarkText = 'CaptionKiln Free';
                const drawText = `drawtext=fontfile='/Inter-Bold.ttf':text='${watermarkText}':fontcolor=white@0.5:fontsize=24:x=w-tw-20:y=h-th-20`;
                filterComplex += `,${drawText}`;
            }

            console.log('Running FFmpeg with filter:', filterComplex);

            // Run FFmpeg
            const ret = await ffmpeg.exec([
                '-i', 'input.mp4',
                '-vf', filterComplex,
                '-c:a', 'copy',
                '-c:v', 'libx264',
                '-preset', 'ultrafast',
                'output.mp4'
            ]);

            console.log('FFmpeg exit code:', ret);
            if (ret !== 0) {
                throw new Error('FFmpeg processing failed (Exit Code != 0). Check Console.');
            }

            // 5. Read Output
            console.log('Reading output...');
            const data = await ffmpeg.readFile('output.mp4');

            // 6. Create Blob & Download
            const uint8Array = data as Uint8Array;
            const buffer = uint8Array.buffer as ArrayBuffer;
            const blob = new Blob([buffer], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `captionkiln_export_${isPro ? 'pro' : 'free'}_${Date.now()}.mp4`;
            a.click();
            URL.revokeObjectURL(url);
            console.log('Export complete.');

        } catch (err: any) {
            console.error("Export Error:", err);
            setError(err.message || "Export failed.");
        } finally {
            setIsExporting(false);
        }
    };

    return {
        exportVideo,
        isExporting,
        progress,
        error
    };
}
