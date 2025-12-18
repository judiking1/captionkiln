export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl text-gray-300">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Account Information:</strong> Email address and authentication data via Supabase.</li>
                        <li><strong>Usage Data:</strong> Anonymous analytics to improve our service.</li>
                        <li><strong>Payment Data:</strong> Processed securely by our payment providers (Stripe/PortOne); we do not store credit card numbers.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p>We use your information to provide access to the Service, process payments, and improve user experience.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                    <p>Video processing happens client-side in your browser. Your video files are not uploaded to our servers for processing in the standard workflow, ensuring maximum privacy.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                    <p>We use essential cookies for authentication and session management.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                    <p>If you have questions about this Privacy Policy, please contact us at support@captionkiln.com.</p>
                </section>
            </div>
        </div>
    )
}
