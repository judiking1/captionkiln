import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-kiln-black text-center p-6">
            <h2 className="text-4xl font-bold text-ember mb-4">404 - Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md">Could not find the requested resource. The page you are looking for might have been removed or never existed.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-ash rounded-lg border border-white/10 hover:bg-ember/20 hover:text-ember transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}
