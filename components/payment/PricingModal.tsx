'use client'

import { Check, CreditCard } from 'lucide-react';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-ash border border-white/10 rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-ash-light scrollbar-track-transparent" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-5 text-center border-b border-white/10 bg-gradient-to-b from-ember/10 to-transparent">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-ember/20 text-ember-glow text-[10px] font-bold mb-2 border border-ember/20">
                        Launch Special
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-1">Upgrade to Pro</h2>
                    <p className="text-gray-400 text-xs">Unlock the full power of the Kiln</p>

                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">✕</button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center justify-center text-white mb-6">
                        <span className="text-4xl font-bold tracking-tight">₩9,900</span>
                        <span className="text-gray-500 ml-1 text-sm">/ month</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                        {[
                            'Remove Watermark',
                            'Export in 1080p & 4K',
                            'Priority Rendering Speed',
                            'SRT & VTT Export',
                            'Advanced Timeline Tools'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                <div className="w-4 h-4 rounded-full bg-ember/20 flex items-center justify-center shrink-0">
                                    <Check size={10} className="text-ember" />
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="p-3 bg-kiln-black/50 rounded-lg border border-white/5 mb-5 text-xs text-gray-400 font-mono">
                        <p className="mb-1.5 font-bold text-white">Bank Transfer (Manual Activation)</p>
                        <p>Bank: KakaoBank</p>
                        <p>Account: 3333-00-0000000</p>
                        <p>Name: CaptionKiln (John Doe)</p>
                    </div>

                    <button
                        className="w-full py-3 rounded-lg bg-ember hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-ember/20 flex items-center justify-center gap-2 text-sm"
                        onClick={() => alert("Please transfer the amount and contact support for activation.")}
                    >
                        <CreditCard size={18} />
                        I HAVE TRANSFERRED
                    </button>

                    <p className="text-center text-[10px] text-gray-600 mt-3">
                        Automatic payments coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
