import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://kauzjlqrrjizambbyclj.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase Client (Database & File Storage)
 * 
 * Authentication is managed exclusively by Clerk (@clerk/expo).
 * This client is dedicated for Supabase Storage buckets (e.g. avatar uploads,
 * biomarkers, clinical docs) and PostgreSQL database access.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
