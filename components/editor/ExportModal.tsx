'use client'

import React, { useState } from 'react';
import { Download, CheckCircle, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportModalProps {
    isOpen: boolean;
    isPro: boolean;
    onClose: () => void;
    onExportFree: () => void;
    onExportPro: (quality: '1080p' | '4k') => void;
    onUpgrade?: () => void;
}

export default function ExportModal({ isOpen, isPro, onClose, onExportFree, onExportPro, onUpgrade }: ExportModalProps) {
    const [selectedQuality, setSelectedQuality] = useState<'1080p' | '4k'>('1080p');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-ash border border-white/10 rounded-xl max-w-xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Export Video</h2>
                        <p className="text-gray-400 text-xs">Choose your export method</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
                </div>

                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {/* Free Plan */}
                    <div className="p-5 hover:bg-white/5 transition-colors">
                        <div className="flex flex-col h-full">
                            <div className="mb-4">
                                <span className="px-2 py-0.5 rounded-full bg-ash-light text-gray-300 text-[10px] uppercase font-bold tracking-wider">Free</span>
                                <h3 className="text-2xl font-bold text-white mt-2">Watermarked</h3>
                                <p className="text-gray-400 text-xs mt-1">Export with branding</p>
                            </div>

                            <ul className="space-y-2 mb-6 flex-1 text-sm">
                                <li className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle size={14} className="text-green-500" />
                                    <span>720p Resolution</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle size={14} className="text-green-500" />
                                    <span>Burned-in Subtitles</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle size={14} className="text-green-500" />
                                    <span>Watermark</span>
                                </li>
                            </ul>

                            <button
                                onClick={onExportFree}
                                className="w-full py-2.5 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Download size={16} />
                                Export Free
                            </button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-5 bg-gradient-to-b from-ember/10 to-transparent">
                        <div className="flex flex-col h-full">
                            <div className="mb-4">
                                <span className="px-2 py-0.5 rounded-full bg-ember text-white text-[10px] uppercase font-bold tracking-wider">Pro</span>
                                <h3 className="text-2xl font-bold text-white mt-2">Clean Video</h3>
                                <p className="text-ember-glow text-xs mt-1">Professional quality</p>
                            </div>

                            <ul className="space-y-2 mb-6 flex-1 text-sm">
                                <li className="flex items-center gap-2 text-white">
                                    <CheckCircle size={14} className="text-ember" />
                                    <span>1080p/4K Resolution</span>
                                </li>
                                <li className="flex items-center gap-2 text-white">
                                    <CheckCircle size={14} className="text-ember" />
                                    <span>No Watermark</span>
                                </li>
                                <li className="flex items-center gap-2 text-white">
                                    <CheckCircle size={14} className="text-ember" />
                                    <span>Subtitle Export</span>
                                </li>
                            </ul>

                            {isPro ? (
                                <div className="space-y-3">
                                    <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
                                        <button
                                            onClick={() => setSelectedQuality('1080p')}
                                            className={cn(
                                                "flex-1 py-1 rounded-md text-xs font-medium transition-colors",
                                                selectedQuality === '1080p' ? 'bg-ember text-white' : 'text-gray-400 hover:text-white'
                                            )}
                                        >
                                            1080p
                                        </button>
                                        <button
                                            onClick={() => setSelectedQuality('4k')}
                                            className={cn(
                                                "flex-1 py-1 rounded-md text-xs font-medium transition-colors",
                                                selectedQuality === '4k' ? 'bg-ember text-white' : 'text-gray-400 hover:text-white'
                                            )}
                                        >
                                            4K
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onExportPro(selectedQuality)}
                                        className="w-full py-2.5 rounded-lg bg-ember text-white font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        onClose();
                                        onUpgrade?.();
                                    }}
                                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-ember to-orange-600 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
                                >
                                    <CreditCard size={16} />
                                    Unlock Pro - ₩9,900
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
