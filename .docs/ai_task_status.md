- [x] **Next.js Migration (CaptionKiln)**
    - [x] Initialize Next.js Project & Branding
    - [x] Landing Page Implementation (Hero/Features)
    - [ ] **Authentication Setup**
        - [ ] Configure Supabase SSR (Server/Client Utils)
        - [ ] Implement Login Page (Google/Kakao)
        - [ ] Protect Dashboard Routes (Middleware)
    - [ ] **Dashboard (Kiln Room)**
        - [ ] Project List View
    - [ ] **Editor Migration**
        - [ ] Port VideoPlayer & ScriptViewer components

- [ ] **Legacy Features (to be ported)**
    - [ ] JSON Import/Export
    - [ ] SRT/VTT Export
    - [ ] Payments (PortOne) -> Manual Bank Transfer only for now

- [x] **Pre-Launch Polish**
    - [x] **Legal**: Terms of Service & Privacy Policy (`app/legal`).
    - [x] **SEO**: `robots.ts`, `sitemap.ts`.
    - [x] **Web Standards**: `error.tsx` (Error Boundary), `loading.tsx` (Suspense).
    - [x] **Mobile Polish**: Review touch targets and grid stacking.

- [ ] **Post-Launch Operations (Real-World Deployment)**
    - [x] **Domain Strategy**: Purchase and connect global CDN domain.
    - [/] **Monitoring**: Setup Analytics (PostHog) - Error Tracking (Sentry) optional.
    - [ ] **Staging vs Prod**: Establish Vercel Preview workflow.
    - [x] **Marketing**: Search Console verification.

- [ ] **Post-Launch Optimizations (Strategy)**
    - [ ] **Export Strategy**: Evaluate Web Workers or SSR (Lambda) for unblocking UI.

