export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-kiln-black">
            <div className="w-16 h-16 border-4 border-ember border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 font-mono text-sm animate-pulse">Heating up the Kiln...</p>
        </div>
    )
}
