import { createClient } from '@supabase/supabase-js';

const supabaseUrlRaw = import.meta.env.VITE_SUPABASE_URL ?? 'http://localhost:54321';
const supabaseAnonKeyRaw = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'chave-publica-local';

export const supabaseConfigurado = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = supabaseUrlRaw.trim();
const supabaseAnonKey = supabaseAnonKeyRaw.trim();

console.log('supabaseUrl no build:', supabaseUrl);
console.log('supabaseAnonKey no build:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
