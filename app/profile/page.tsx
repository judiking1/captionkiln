'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, CreditCard, LogOut, Settings, Crown, ChevronRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import PricingModal from '@/components/payment/PricingModal';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
    const { user, profile, loading } = useProfile();
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.refresh();
        router.push('/login');
    }

    if (loading) return <div className="min-h-screen bg-kiln-black flex items-center justify-center text-gray-500">Loading...</div>;
    if (!user || !profile) return <div className="min-h-screen bg-kiln-black flex items-center justify-center">Redirecting...</div>;

    const isPro = profile.is_pro;

    return (
        <div className="min-h-screen bg-kiln-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Profile Header */}
                <div className="flex items-center justify-between p-6 bg-ash/30 rounded-xl border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center gap-5">
                        <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-2 ring-white/10",
                            isPro ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-ember/20" : "bg-gradient-to-br from-ash-light to-gray-600"
                        )}>
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-white">{user.email}</h1>
                                {isPro && <Crown size={16} className="text-amber-400 fill-amber-400" />}
                            </div>
                            <p className="text-gray-400 text-sm">Kiln Operator</p>
                        </div>
                    </div>
                    <div className={cn(
                        "px-3 py-1 rounded-full border text-xs font-medium",
                        isPro ? "bg-ember/20 border-ember/50 text-ember-glow" : "bg-ash border-white/10 text-gray-300"
                    )}>
                        {isPro ? "Pro Plan" : "Free Plan"}
                    </div>
                </div>

                {/* Settings Grid */}
                <div className="grid md:grid-cols-2 gap-4">

                    {/* Subscription */}
                    <div className="p-5 bg-ash/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col">
                        <div className="flex items-center gap-2 mb-3 text-ember">
                            <Crown size={20} />
                            <h2 className="text-base font-bold">Subscription</h2>
                        </div>
                        {isPro ? (
                            <p className="text-gray-400 text-sm mb-5 flex-1 leading-relaxed">
                                You are currently on the <strong className="text-ember-glow">Pro Plan</strong>.<br />
                                Enjoy 4K exports and watermark-free videos.
                            </p>
                        ) : (
                            <p className="text-gray-400 text-sm mb-5 flex-1 leading-relaxed">
                                You are currently on the <strong className="text-white">Free Plan</strong>.<br />
                                Upgrade to unlock 4K exports and remove watermarks.
                            </p>
                        )}
                        {!isPro && (
                            <button
                                onClick={() => setIsPricingOpen(true)}
                                className="w-full py-2.5 bg-ember hover:bg-orange-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-ember/10"
                            >
                                <CreditCard size={16} /> Upgrade to Pro
                            </button>
                        )}
                        {isPro && (
                            <button className="w-full py-2.5 bg-ash hover:bg-ash-light text-white font-medium rounded-lg transition-colors border border-white/10 text-sm">
                                Manage Subscription
                            </button>
                        )}
                    </div>

                    {/* Preferences */}
                    <div className="p-5 bg-ash/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col">
                        <div className="flex items-center gap-2 mb-3 text-white">
                            <Settings size={20} />
                            <h2 className="text-base font-bold">Preferences</h2>
                        </div>
                        <div className="flex-1 space-y-3 mb-5">
                            <div className="flex justify-between items-center p-2 rounded bg-black/20 border border-white/5">
                                <span className="text-xs text-gray-400">Default Export</span>
                                <span className="text-xs text-gray-300 font-mono">MP4 (1080p)</span>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded bg-black/20 border border-white/5">
                                <span className="text-xs text-gray-400">Auto-Save</span>
                                <span className="text-xs text-gray-300 font-mono">Every 5m</span>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded bg-black/20 border border-white/5">
                                <span className="text-xs text-gray-400">Render Engine</span>
                                <span className="text-xs text-gray-300 font-mono">Cloud (Beta)</span>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-ash hover:bg-ash-light text-white font-medium rounded-lg transition-colors border border-white/10 text-sm cursor-not-allowed opacity-70">
                            Manage Details (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="p-5 rounded-xl border border-red-500/10 bg-red-500/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-red-400 font-bold text-sm">Account Actions</h3>
                        <p className="text-red-400/60 text-xs mt-1">Sign out of your session on this device.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>

            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </div>
    );
}
