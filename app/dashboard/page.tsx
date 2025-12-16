import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-kiln-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Kiln Room
                        </h1>
                        <p className="text-gray-400 mt-1">Welcome back, {user.email}</p>
                    </div>
                    <Link
                        href="/editor"
                        className="bg-ember hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        + New Project
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder for projects */}
                    <div className="border border-white/10 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center text-gray-500 hover:border-ember/50 hover:bg-ash/20 transition-all cursor-pointer group">
                        <div className="p-4 rounded-full bg-ash group-hover:bg-ember/10 mb-4 transition-colors">
                            <span className="text-2xl group-hover:text-ember transition-colors">+</span>
                        </div>
                        Create new project
                    </div>
                </div>
            </div>
        </div>
    )
}
