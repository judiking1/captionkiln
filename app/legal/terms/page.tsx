export default function TermsPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl text-gray-300">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            <div className="prose prose-invert max-w-none space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing and using CaptionKiln ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                    <p>CaptionKiln provides browser-based video captioning and editing tools. We offer both free and paid ("Pro") tiers.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                    <p>You are responsible for maintaining the security of your account credentials. You are responsible for all activities that occur under your account.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Content & Privacy</h2>
                    <p>CaptionKiln processes videos locally within your browser. We do not store your video files on our servers unless explicitly stated for specific advanced features. Your projects metadata (scripts, settings) are stored securely.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
                    <p>The Service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.</p>
                </section>
            </div>
        </div>
    )
}
