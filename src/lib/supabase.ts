import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Only initialise if both vars are present — avoids a crash when env vars
// are not set (e.g. plain Vercel preview without secrets configured).
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;