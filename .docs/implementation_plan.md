# CaptionKiln Implementation Plan

## 1. Vision
**CaptionKiln**: A multi-video browser studio where you *Load* clips, *Edit* subtitles, and *Bake* them into a final render.
- **Core Value**: Multi-video. One caption timeline. Final export.
- **Tech Stack**: Next.js 15 (App Router), Tailwind CSS, Supabase (Auth/DB), Zustand.

## 2. Branding Implementation
- **Colors**:
    - **Kiln Black** (Bg): `#0B0F14`
    - **Ash** (Panel): `#111827` ~ `#1F2937`
    - **Ember** (Accent): `#FF6A2A`
- **Typography**:
    - UI: `Inter`
    - Editor/Time: `JetBrains Mono`
- **Terminology**: Load, Edit, Bake.

## 3. Phase 1: Foundation (Current Task)
- [ ] **Initialize Next.js**: Setup in `E:\Personal_Project\captionkiln`.
- [ ] **Tailwind Config**: Define custom colors (`bg-kiln-black`, `text-ember`).
- [ ] **Fonts**: Configure `next/font` for Inter and JetBrains Mono.
- [ ] **Landing Page**: Implement the "Hero" section with the copy provided.
- [ ] **Auth Setup**: Port Supabase Auth from the old project.

## 4. Phase 2: Editor Migration
- [ ] **Port VideoPlayer**: Migrate logic, adapt to Next.js SSR rules (use `next/dynamic` or `use client`).
- [ ] **Port MultiViewGrid**: Rename to 'Panels'.
- [ ] **Port ScriptViewer**: Rename to 'Caption Track'.
- [ ] **Export Logic**: Rename 'Export' to 'Bake'.

## 5. Phase 3: Dashboard & Persistence
- [ ] **Kiln Room (Workspace)**: Saved projects list.
- [ ] **Database**: Save project state (video URLs, subtitle JSON) to Supabase.
## 6. Export Strategy Analysis (Request vs Reality)
**Goal**: Advanced export without freezing UI.

### Option A: Web Workers (Recommended Next Step)
- **Concept**: Move the Canvas/Encoding loop to a dedicated Worker thread.
- **Pros**: Keeps the Main Thread (UI) responsive. User can click other buttons while exporting.
- **Cons**: Cannot access DOM directly. Requires `OffscreenCanvas` (modern browser support good).
- **Verdict**: **Good for "v1.1"**.

### Option B: Server-Side Rendering (AWS Lambda / Cloud Run)
- **Concept**: Send JSON script + Video URL to a cloud function running native FFmpeg.
- **Pros**: Perfect quality, supports any format, zero burden on user's laptop.
- **Cons**: 
    - **Cost**: Video processing is CPU intensive ($$$).
    - **Complexity**: Presigned URLs, Queue management (Redis/Bull), Storage costs.
    - **Privacy**: User must upload private videos to your server.
- **Verdict**: **Overkill for MVP**. Only needed if scaling to Hollywood-tier production flows.

### Option C: Client-Side Main Thread (Current)
- **Pros**: Free, Private (video never leaves laptop), Simple code.
- **Cons**: Freezes UI during export on slow machines.
- **Verdict**: **Best for MVP**.
