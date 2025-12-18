'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-kiln-black text-white p-4">
            <h2 className="text-2xl font-bold text-ember mb-4">Something went wrong!</h2>
            <p className="text-gray-400 mb-8 max-w-md text-center">
                We encountered an unexpected error. Don't worry, your data is likely safe locally.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-3 bg-ash rounded-lg border border-white/10 hover:bg-ember/20 hover:text-ember transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
