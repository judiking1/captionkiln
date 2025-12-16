import Image from 'next/image';

export default function Watermark() {
    return (
        <div className="absolute top-4 left-4 z-10 opacity-50 pointer-events-none">
            {/* Using text for now if logo not ready, or logo */}
            <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                <span className="text-white/80 font-bold text-xs">CaptionKiln</span>
            </div>
        </div>
    );
}
