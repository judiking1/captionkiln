# CaptionKiln 
> 🔥 **Bake captions directly into your final render.**

CaptionKiln is a powerful, browser-based multi-video subtitle editor that allows users to synchronize script lines across multiple takes and export a final video with "burned-in" subtitles. No expensive desktop software required.

## 🚀 Features

*   **Multi-Video Workspace**: Load multiple takes/files and reference them side-by-side.
*   **Unified Script Timeline**: Edit one script that syncs across all loaded video instances.
*   **Burned-in Export**:
    *   **Free**: 720p with Watermark.
    *   **Pro**: 1080p/4K, No Watermark.
    *   **Engine**: Robust Client-side `Canvas` + `MediaRecorder` pipeline (Zero server load).
*   **Authentication**: Secure login via Supabase (Email/Password).
*   **Subscription**: Stripe Integration (via PortOne/Custom logic potential) for Pro status.

## 🛠 Technology Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Directory)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `lucide-react` Icons.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Project state, Video instances).
*   **Backend / Auth**: [Supabase](https://supabase.com/).
*   **Video Processing**: Native HTML5 `Canvas` + `MediaRecorder` API.

## 📂 Project Structure

```
├── app/
│   ├── auth/          # Supabase Auth Callbacks
│   ├── dashboard/     # User Project Dashboard (Future)
│   ├── editor/        # Internal Workspace (Panels, Player)
│   ├── login/         # Auth Pages
│   ├── layout.tsx     # Global Shell (Header/Footer)
│   └── page.tsx       # Landing Page
├── components/
│   ├── editor/        # Core feature components (VideoPlayer, ScriptViewer)
│   └── ui/            # Shared primitives
├── hooks/
│   ├── useProfile.ts      # Auth & Subscription State
│   └── useVideoExporter.ts # The "Baking" Engine 
├── lib/
│   └── subtitleUtils.ts   # SRT/VTT Parsing & Generation
└── store/
    └── projectStore.ts    # Global Video/Script State
```

## 🏃 Getting Started

1.  **Environment Setup**:
    Create a `.env.local` file:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

2.  **Install & Run**:
    ```bash
    npm install
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## 🧩 Key Implementation Details

*   **Export Engine**: Originally attempted using `ffmpeg.wasm`, but switched to a more robust **Canvas Capture** method to avoid virtual filesystem issues and guarantee font rendering. The video is played virtually, frames are drawn to a canvas with text, and captured via `MediaRecorder`.
*   **Memory Management**: Video BLOBs are managed via `URL.createObjectURL`. The `projectStore` handles strict cleanup to prevent browser crashes during long sessions.

## 🛡 License

Commercial / Private.
