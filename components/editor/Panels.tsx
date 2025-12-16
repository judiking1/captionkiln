'use client'

import React, { useState } from 'react';
import { X, Upload, LayoutGrid, Crown } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { cn } from '@/lib/utils';
import VideoPlayer from './VideoPlayer';
import PricingModal from '../payment/PricingModal';

import { useProfile } from '@/hooks/useProfile';

export default function Panels() {
    const { videos, addVideo, removeVideo, clearProject } = useProjectStore();
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const { profile } = useProfile();
    const isPro = profile?.is_pro ?? false;

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        Array.from(files).forEach(addVideo);
        event.target.value = '';
    };

    const getGridCols = () => {
        const count = videos.length;
        if (count <= 1) return "grid-cols-1";
        if (count === 2) return "grid-cols-1 md:grid-cols-2";
        if (count <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
        if (count <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col bg-kiln-black relative scrollbar-thin scrollbar-thumb-ash scrollbar-track-transparent p-4">
            {/* Pro Upgrade Trigger (Hidden if pro) */}
            {!isPro && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsPricingOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        <Crown size={16} /> <span className="text-sm font-bold">Upgrade</span>
                    </button>
                </div>
            )}

            <div className={cn(
                "grid gap-4 transition-all duration-300 w-full mx-auto",
                videos.length === 1 ? "max-w-screen-xl" : "max-w-[1600px]",
                getGridCols(),
                videos.length > 0 ? "auto-rows-auto" : "h-full"
            )}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="relative group flex flex-col bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 transform-gpu 2xl:aspect-video"
                    >
                        <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => removeVideo(video.id)}
                                className="p-2 bg-black/50 hover:bg-ember/80 text-white rounded-full backdrop-blur-md transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            {/* Title Overlay */}
                            <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <h3 className="text-white font-medium truncate shadow-black drop-shadow-md">{video.title}</h3>
                            </div>
                            <VideoPlayer
                                video={video}
                                isPro={isPro}
                                onUpgrade={() => setIsPricingOpen(true)}
                            />
                        </div>
                    </div>
                ))}

                {videos.length === 0 && (
                    <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-ash rounded-2xl bg-ash/20">
                        <div className="w-20 h-20 bg-ash rounded-full flex items-center justify-center mb-6 shadow-xl border border-white/5">
                            <LayoutGrid size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Start Your Project</h3>
                        <p className="text-gray-400 mb-6 max-w-md text-center">
                            Import videos to start editing, adding subtitles, and creating content.
                        </p>
                        <label className="flex items-center gap-2 px-6 py-3 bg-ember hover:bg-orange-600 text-white rounded-xl cursor-pointer transition-all hover:scale-105 shadow-xl shadow-ember/20 font-bold">
                            <Upload size={20} />
                            <span>Import Video</span>
                            <input
                                type="file"
                                multiple
                                accept="video/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                )}
            </div>

            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </div>
    );
}
