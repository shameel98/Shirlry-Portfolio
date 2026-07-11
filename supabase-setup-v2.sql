-- Run this in Supabase SQL Editor

-- Leads (form submissions)
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_gradient text DEFAULT 'linear-gradient(135deg, #a855f7, #6366f1)',
  cover_image text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Settings (Calendly, GA, etc)
CREATE TABLE site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  calendly_url text DEFAULT '',
  google_analytics_id text DEFAULT '',
  profile_image_url text DEFAULT ''
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read" ON leads FOR SELECT USING (true);
CREATE POLICY "Public write" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public write" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public write" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Default settings
INSERT INTO site_settings (calendly_url, google_analytics_id) VALUES ('', '');

-- Create storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Allow public access to storage
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
