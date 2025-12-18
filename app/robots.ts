import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard', '/editor', '/api/'], // Protect private routes
        },
        sitemap: 'https://captionkiln.com/sitemap.xml',
    }
}
