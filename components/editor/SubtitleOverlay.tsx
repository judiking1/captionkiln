import React, { useMemo } from 'react';
import type { ScriptLine } from '@/store/projectStore';

interface SubtitleOverlayProps {
    script: ScriptLine[];
    currentTime: number;
}

export default function SubtitleOverlay({ script, currentTime }: SubtitleOverlayProps) {
    const currentSubtitle = useMemo(() => {
        return script.find(line => currentTime >= line.startTime && currentTime <= line.endTime);
    }, [script, currentTime]);

    if (!currentSubtitle) return null;

    return (
        <div className="absolute bottom-16 left-0 right-0 z-10 flex justify-center px-8 pointer-events-none">
            <div className="text-white text-xl md:text-2xl font-bold bg-black/60 px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-sm max-w-2xl">
                {currentSubtitle.text}
            </div>
        </div>
    );
}
