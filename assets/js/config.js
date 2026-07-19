// Supabase configuration
// The anon key is intentionally public — it is safe to expose in static sites.
// Security is enforced server-side via Supabase Row Level Security (RLS) policies.
// See: https://supabase.com/docs/guides/api/api-keys
const SUPABASE_URL = 'https://wrfbvekawdsfqtyrynad.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZmJ2ZWthd2RzZnF0eXJ5bmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3OTA3NjEsImV4cCI6MjA5OTM2Njc2MX0.D3pPMsBBb53g7z_n88g4ZHFuny6jgtJWpkXPDa0lji4';

// Validates that a URL belongs to the configured Supabase project — prevents SSRF
function assertSupabaseURL(url) {
  const parsed = new URL(url);
  if (parsed.origin !== SUPABASE_URL) throw new Error('Blocked request to untrusted host: ' + parsed.origin);
}
