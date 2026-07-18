// Supabase configuration
// IMPORTANT: Do NOT hardcode credentials here.
// Set these via your build pipeline, a server-side endpoint, or environment injection.
// Example using a meta tag injected at build time:
//   <meta name="supabase-url" content="{{ SUPABASE_URL }}">
//   <meta name="supabase-key" content="{{ SUPABASE_ANON_KEY }}">
const SUPABASE_URL = document.querySelector('meta[name="supabase-url"]')?.content || '';
const SUPABASE_KEY = document.querySelector('meta[name="supabase-key"]')?.content || '';
