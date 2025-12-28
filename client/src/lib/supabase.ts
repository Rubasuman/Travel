import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helpers
export const signInWithEmail = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) throw error;
	return data;
};

export const signUpWithEmail = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
	return data;
};

export const logOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
	return true;
};

export const onAuthChange = (cb: (user: any) => void) => {
	const { data: subscription } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
 		cb(session?.user ?? null);
 	});

	// return unsubscribe function
	return () => subscription?.subscription?.unsubscribe?.();
};

export const requestNotificationPermission = async () => {
	try {
		const permission = await Notification.requestPermission();
		return permission === 'granted';
	} catch (e) {
		console.error('Error requesting notification permission:', e);
		return false;
	}
};
// NOTE: Direct client-side DB helpers have been removed to ensure only server-side writes persist trips.
