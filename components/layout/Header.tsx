'use client'

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Header() {
    const pathname = usePathname();
    const isEditor = pathname?.startsWith('/editor');
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const supabase = createClient();

        // Check initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <header className={cn(
            "border-b border-ash bg-kiln-black/50 backdrop-blur-md sticky top-0 z-50",
            isEditor && "fixed w-full"
        )}>
            <div className={cn(
                "container mx-auto px-6 h-16 flex items-center justify-between",
                isEditor && "px-4 h-14"
            )}>
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/icons/logo.png" alt="CaptionKiln Logo" width={isEditor ? 28 : 32} height={isEditor ? 28 : 32} className="rounded-lg" />
                    <span className={cn(
                        "font-bold tracking-tight",
                        isEditor ? "text-lg" : "text-xl"
                    )}>
                        CaptionKiln
                    </span>
                </Link>

                {!isEditor ? (
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                        <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
                    </nav>
                ) : (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-ember/10 rounded-full border border-ember/20">
                        <Flame size={12} className="text-ember" />
                        <span className="text-xs font-mono text-ember-glow">Beta Environment</span>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                {user.email?.split('@')[0]}
                            </Link>
                            {/* Sign Out is handled in profile page or we can add a small button here */}
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Log In
                        </Link>
                    )}

                    <Link
                        href="/editor"
                        className={cn(
                            "text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_-3px_rgba(255,106,42,0.4)] hover:shadow-[0_0_20px_-3px_rgba(255,106,42,0.6)]",
                            isEditor
                                ? "bg-ash hover:bg-ash-light px-3 py-1.5"
                                : "bg-ember hover:bg-orange-600 px-4 py-2"
                        )}
                    >
                        {isEditor ? "New Project" : "Start Baking"}
                    </Link>
                </div>
            </div>
        </header>
    );
}
