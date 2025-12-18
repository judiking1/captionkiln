import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface ScriptLine {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
}

export interface VideoInstance {
    id: string;
    file?: File; // Local file object (not serializable to DB, but needed for preview)
    src: string; // Blob URL or Remote URL
    type: string;
    title: string;
    script: ScriptLine[]; // Lifted state
}

interface ProjectState {
    videos: VideoInstance[];

    // Actions
    addVideo: (file: File) => void;
    removeVideo: (id: string) => void;
    updateScript: (videoId: string, script: ScriptLine[]) => void;
    clearProject: () => void;

    // For hydration/loading from DB
    loadProject: (videos: VideoInstance[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    videos: [],

    addVideo: (file) => {
        const newVideo: VideoInstance = {
            id: uuidv4(),
            file,
            src: URL.createObjectURL(file),
            type: file.type || 'video/mp4',
            title: file.name,
            script: [] // Start with empty script
        };
        set((state) => ({ videos: [...state.videos, newVideo] }));
    },

    removeVideo: (id) => {
        set((state) => {
            const videoRemove = state.videos.find(v => v.id === id);
            if (videoRemove) {
                URL.revokeObjectURL(videoRemove.src);
            }
            return { videos: state.videos.filter((v) => v.id !== id) };
        });
    },

    updateScript: (videoId, script) => {
        set((state) => ({
            videos: state.videos.map((v) =>
                v.id === videoId ? { ...v, script } : v
            )
        }));
    },

    clearProject: () => set({ videos: [] }),

    loadProject: (videos) => set({ videos })
}));
