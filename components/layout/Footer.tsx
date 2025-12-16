import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-kiln-black border-t border-ash flex flex-col items-center justify-center py-8 shrink-0 relative z-40">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                    <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
                    <span className="w-px h-3 bg-ash-light" />
                    <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                </div>

                <div className="w-px h-3 bg-ash-light hidden md:block" />

                <p>&copy; {new Date().getFullYear()} CaptionKiln. All rights reserved.</p>
            </div>
        </footer>
    );
}
