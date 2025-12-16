import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { loginWith } from "./actions";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-kiln-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ember/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md p-8 bg-ash/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4 hover:scale-105 transition-transform">
                        <Image src="/icons/logo.png" alt="CaptionKiln" width={64} height={64} className="rounded-xl mx-auto shadow-lg" />
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400 text-sm">Sign in to access your Kiln Workspace</p>
                </div>

                <div className="space-y-4">
                    <form action={async () => {
                        'use server'
                        await loginWith('google')
                    }}>
                        <button className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg flex items-center justify-center gap-3 transition-colors">
                            <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
                            Continue with Google
                        </button>
                    </form>

                    <form action={async () => {
                        'use server'
                        await loginWith('kakao')
                    }}>
                        <button className="w-full h-12 bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-bold rounded-lg flex items-center justify-center gap-3 transition-colors">
                            <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current">
                                <path d="M12 3C5.373 3 0 7.373 0 12.77c0 3.518 2.296 6.6 5.8 8.16-.27 1.01-1.02 3.69-1.06 3.91-.04.28.1.55.3.62.2.06.5.01.76-.17.38-.27 4.19-2.79 5.86-3.93.43.06.87.09 1.34.09 6.627 0 12-4.373 12-9.77C24 7.373 18.627 3 12 3z" />
                            </svg>
                            Continue with Kakao
                        </button>
                    </form>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-ember-glow/80 bg-ember/10 px-3 py-1 rounded-full border border-ember/20">
                        <Sparkles size={12} />
                        <span>Pro Tip: Pro status syncs across devices</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
