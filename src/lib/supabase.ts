import { createClient } from '@supabase/supabase-js';

// Trim trailing slashes so hand-built URLs (e.g. resolveImageUrl in mediaStore.ts)
// never end up with a double slash if VITE_PUBLIC_SUPABASE_URL is set with one.
export const SUPABASE_URL = (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string).replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);