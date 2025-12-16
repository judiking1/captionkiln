import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export interface Profile {
    id: string;
    is_pro: boolean;
    email: string | undefined;
}

export function useProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        const fetchProfile = async (sessionUser: User | null) => {
            if (!sessionUser) {
                setUser(null);
                setProfile(null);
                setLoading(false);
                return;
            }

            setUser(sessionUser);

            // Fetch profile data
            const { data, error } = await supabase
                .from('profiles')
                .select('is_pro')
                .eq('id', sessionUser.id)
                .single();

            // If no profile exists yet (first login), we might default to false, 
            // or the trigger should have created it.
            // We'll trust the DB or default to false.
            const isPro = data?.is_pro ?? false;

            setProfile({
                id: sessionUser.id,
                email: sessionUser.email,
                is_pro: isPro
            });
            setLoading(false);
        };

        // Initial load
        supabase.auth.getUser().then(({ data: { user } }) => fetchProfile(user));

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchProfile(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return { user, profile, loading };
}
