# Monetization & Features Walkthrough

I have implemented the requested monetization features, authentication, and the JSON import/export functionality.

## Changes

### 1. Authentication & User Profile
- **Supabase Integration**: Added `supabase.ts` and `authStore.ts` for managing user sessions.
- **Login Page**: Created `src/pages/Login.tsx` with Google Sign-In (requires Supabase setup).
- **Profile Page**: Created `src/pages/Profile.tsx` to view user info and subscription status.
- **Routing**: Wrapped the app in `BrowserRouter` to support multiple pages.

### 2. Monetization
- **Payments**: Integrated **PortOne** SDK for Korean payments.
- **Pro Features**:
    - **Watermark Removal**: Watermark is hidden for Pro users.
    - **High Quality Export**: 1080p and 4K export options are unlocked for Pro users.
- **AdSense**: Added an `AdBanner` component at the bottom of the editor as a placeholder for Google AdSense.

### 3. New Features
- **JSON Import/Export**: Added buttons in the `ScriptViewer` header to export subtitles as JSON and import them back.
    - Format: `Key: "start-end" (seconds), Value: "text"`
- **Script Management**: Added SRT and VTT export options (Pro only) and import support.

### 4. Commercial Launch Prep
- **UI/UX Improvements**:
    - **Responsive Grid**: Implemented specific layouts. The "Stacked Layout" (Script below Video) is now used universally on **Mobile, Tablet, and Laptop (up to 1536px)** to ensure usability in grid views. The "Overlay Layout" is reserved for large Desktop screens (2xl+). (**Fixed clipping issues by removing fixed aspect ratio constraints on non-overlay cards**).
    - **Header Reset**: Clicking the Logo/Title in the header now prompts to clear the workspace.
    - **Standard Footer**: Replaced the placeholder ad banner with a standard footer containing links to Terms, Privacy, and Admin contact.
    - **Mobile Controls**: Optimized controls with icon-only Export button and compact spacing to prevent clipping on tablets (768px/1024px).
    - **Header**: Prevented text wrapping by truncating the title on small screens.
    - **Large Screen Optimization**: Implemented dynamic width constraints. Single-video view is capped at **1280px width** (resulting in ~720px height), ensuring the footer is always visible without scrolling on 1080p+ screens. Multi-video view expands to **1600px** to utilize available space.
    - **Branding**: Updated App Icon/Favicon to a "full-bleed" modern symbol with zero padding for better visibility.

### 5. Next.js Migration (CaptionKiln)
- **Initialization**: Created new Next.js 15+ project in `E:\Personal_Project\captionkiln`.
- **Branding Implementation**:
    - **Palette**: Kiln Black (#0B0F14), Ember (#FF6A2A), Ash (#1F2937).
    - **Typography**: Inter (UI), JetBrains Mono (Code/Time).
    - **Landing Page**: Implemented "Hero" and "Features" sections matching the brand identity.
- **Preview**:
    ![CaptionKiln Landing](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/captionkiln_landing_1765903633049.png)

### 6. Authentication & Protected Routes
- **Supabase Integration**:
    - Configured `@supabase/ssr` for modern Next.js server-side auth handling.
    - Created `utils/supabase/server.ts` (Server Components) and `client.ts` (Client Components).
- **Login Page**:
    - Implemented `/login` with branded UI (Background ambience, Ash glassmorphism).
    - Added Google & Kakao OAuth support (reusing existing Supabase config).
- **Protected Dashboard**:
    - Created `/dashboard` which uses SSR to verify session and redirect unauthenticated users.
    - Serves as the user's "Kiln Room" (Project List).
- **Editor Shell**:
    - Created `/editor` route to eventually host the tool.
    - **Header Integration**: Added global `Header` to `RootLayout`, ensuring it persists on the Editor page.
    - **Auth Awareness**: Header now dynamically reflects login status via Supabase `onAuthStateChange`.

### 7. Core Editor Migration
- **Architecture**:
    - **State Management**: Migrated from local component state to `useProjectStore` (Zustand) for better persistence capabilities.
    - **Component Structure**:
        - `Panels`: Main grid layout (Responsive).
        - `VideoPlayer`: Core playback component with HLS.js support. Added Pro status awareness (hides watermark).
        - `ScriptViewer`: Transcript editor with JSON/SRT/VTT support.
        - `Controls`: Custom playback controls matching the legacy design.
        - **Modals**: Reimplemented `ExportModal` and `PricingModal`. Connected `isPro` prop to unlock features dynamically.
    - **Utilities**: Ported subtitle parsing/generating logic to `lib/subtitleUtils.ts`.
    - **Export Engine**: Implemented `useVideoExporter.ts` using the legacy **Canvas + MediaRecorder** approach. This guarantees reliable subtitle burning and watermarking by capturing the playback stream directly, avoiding brittle WASM dependencies for now. Supports 720p (Free) and 1080p/4K (Pro) exports.
- **Backend / Auth**:
    - **Auth Persistence**: Fixed by implementing `useProfile` hook to fetch and sync user state (including `is_pro`).
    - **Sign Out**: Implemented client-side sign-out for immediate UI updates.

- **Preview**:
    ![Editor with Header](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/editor_with_header_1765906626655.png)

    ![Pricing Modal Compact](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/pricing_modal_compact_final_1765907450524.png)

    #### Verification Screenshots
    **Mobile (Stacked Layout):**
    ![Mobile Script View](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/mobile_script_375_1765209973148.png)

    **Tablet (Controls Visibility):**
    ![Tablet 768px](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/tablet_768_1765209989248.png)
    ![Tablet 1024px](C:/Users/wondawon/.gemini/antigravity/brain/9308cafa-1459-4ef8-89e8-dea2bf291851/tablet_1024_1765209994874.png)
- **Manual Bank Transfer**: Replaced PortOne payment with a manual bank transfer modal (`PricingModal.tsx`).
- **Social Login**: Added Kakao login support.
- **Legal Pages**: Added Terms of Service (`/src/pages/Terms.tsx`) and Privacy Policy (`/src/pages/Privacy.tsx`).
- **Refactoring**: Cleaned up `useVideoExporter.ts`, `subtitleUtils.ts`, and `portone.ts` to ensure code quality and remove lint errors.

## Verification Results

### Manual Verification Steps

1.  **Authentication**:
    - Click "Log In" in the header.
    - (Note: You need to configure Supabase credentials in `.env` for this to work fully).
    - Verify redirection to Profile page after login.

2.  **Payments & Pro Upgrade**:
    - Click "Upgrade to Pro" in the header or "Unlock Pro" in the Export modal.
    - Verify the PortOne payment window opens (requires PortOne Merchant ID).
    - After "payment" (mocked success), verify "Pro" badge appears.

3.  **Watermark**:
    - As a Free user, verify the "GridCast" watermark is visible on the video.
    - As a Pro user, verify the watermark disappears.

4.  **Export**:
    - Open Export Modal.
    - Free user: Only "Export Free" (720p) is available.
    - Pro user: "Export 1080p" and "Export 4K" are available.

5.  **JSON Import/Export**:
    - Open the Script Editor (click on a video).
    - Add some subtitles.
    - Click "Export" to download `subtitles.json`.
    - Clear subtitles or refresh.
    - Click "Import" and select the file. Verify subtitles are restored.

## Next Steps
- **Environment Variables**: Create a `.env` file with your `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and PortOne Merchant ID.
- **Supabase Setup**: Create a `profiles` table in Supabase to store the `is_pro` status.
