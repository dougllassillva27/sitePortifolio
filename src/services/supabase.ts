import { createClient } from '@supabase/supabase-js';

const supabaseUrlRaw = import.meta.env.VITE_SUPABASE_URL ?? 'http://localhost:54321';
const supabaseAnonKeyRaw = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'chave-publica-local';

export const supabaseConfigurado = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = supabaseUrlRaw.trim();
const supabaseAnonKey = supabaseAnonKeyRaw.trim();

console.log('supabaseUrl RAW no build:', supabaseUrlRaw);
console.log('supabaseAnonKey RAW no build:', supabaseAnonKeyRaw);
console.log('supabaseUrl TRIMMED no build:', supabaseUrl);
console.log('supabaseAnonKey TRIMMED no build:', supabaseAnonKey);

// Debug mais aprofundado para caracteres invisíveis
console.log(
  'supabaseUrl HEX:',
  Array.from(supabaseUrl)
    .map((c) => c.charCodeAt(0).toString(16))
    .join(' ')
);
console.log(
  'supabaseAnonKey HEX:',
  Array.from(supabaseAnonKey)
    .map((c) => c.charCodeAt(0).toString(16))
    .join(' ')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
