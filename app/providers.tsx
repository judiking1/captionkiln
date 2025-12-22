'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
                person_profiles: 'identified_only',
                capture_pageview: false
                // We disable automatic pageview because we handle it manually in page transitions usually, 
                // but for simple apps leaving it on is okay. 
                // However, PostHogProvider component from posthog-js/react handles context, 
                // initializing it here.
            })
        }
    }, [])

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
