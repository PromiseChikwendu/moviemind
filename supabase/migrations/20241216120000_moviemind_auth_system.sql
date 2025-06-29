-- Location: supabase/migrations/20241216120000_moviemind_auth_system.sql
-- MovieMind Authentication System with User Profiles and Movie Data

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('admin', 'premium', 'basic');
CREATE TYPE public.watchlist_status AS ENUM ('want_to_watch', 'watching', 'watched', 'dropped');

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    role public.user_role DEFAULT 'basic'::public.user_role,
    preferences JSONB DEFAULT '{"genres": [], "languages": ["en"], "notifications": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Movies table for app functionality
CREATE TABLE public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tmdb_id INTEGER UNIQUE,
    title TEXT NOT NULL,
    overview TEXT,
    poster_path TEXT,
    backdrop_path TEXT,
    release_date DATE,
    genres TEXT[],
    rating DECIMAL(3,1),
    runtime INTEGER,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User watchlists
CREATE TABLE public.watchlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    movie_id UUID REFERENCES public.movies(id) ON DELETE CASCADE,
    status public.watchlist_status DEFAULT 'want_to_watch'::public.watchlist_status,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    watched_at TIMESTAMPTZ,
    UNIQUE(user_id, movie_id)
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_movies_tmdb_id ON public.movies(tmdb_id);
CREATE INDEX idx_movies_rating ON public.movies(rating DESC);
CREATE INDEX idx_watchlist_user_id ON public.watchlist_items(user_id);
CREATE INDEX idx_watchlist_movie_id ON public.watchlist_items(movie_id);
CREATE INDEX idx_watchlist_status ON public.watchlist_items(status);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;

-- 4. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.owns_watchlist_item(item_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.watchlist_items wi
    WHERE wi.id = item_uuid AND wi.user_id = auth.uid()
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, display_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'basic'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Trigger for updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 5. RLS Policies
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_manage_users"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "movies_public_read"
ON public.movies
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_movies"
ON public.movies
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "users_manage_own_watchlist"
ON public.watchlist_items
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins_view_all_watchlists"
ON public.watchlist_items
FOR SELECT
TO authenticated
USING (public.is_admin());

-- 6. Complete Mock Data
DO $$
DECLARE
    demo_user_id UUID := gen_random_uuid();
    admin_user_id UUID := gen_random_uuid();
    movie1_id UUID := gen_random_uuid();
    movie2_id UUID := gen_random_uuid();
    movie3_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (demo_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'demo@moviemind.com', crypt('demo123', gen_salt('bf', 10)), now(), now(), now(),
         '{"display_name": "Demo User"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@moviemind.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"display_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample movies
    INSERT INTO public.movies (id, tmdb_id, title, overview, poster_path, backdrop_path, release_date, genres, rating, runtime) VALUES
        (movie1_id, 550, 'Fight Club', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.', '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', '/52AfXWuXCHn3UjD17rBruA9f5qb.jpg', '1999-10-15', ARRAY['Drama', 'Thriller'], 8.8, 139),
        (movie2_id, 13, 'Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man.', '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', '/7c8a35785c8b8d4dddac9d2e0c0fd8e4.jpg', '1994-06-23', ARRAY['Drama', 'Romance'], 8.8, 142),
        (movie3_id, 157336, 'Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.', '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg', '2014-11-07', ARRAY['Adventure', 'Drama', 'Science Fiction'], 8.6, 169);

    -- Create sample watchlist items
    INSERT INTO public.watchlist_items (user_id, movie_id, status, rating, notes) VALUES
        (demo_user_id, movie1_id, 'watched'::public.watchlist_status, 9, 'Amazing film with deep themes'),
        (demo_user_id, movie2_id, 'want_to_watch'::public.watchlist_status, null, 'Classic I need to rewatch'),
        (demo_user_id, movie3_id, 'watching'::public.watchlist_status, null, 'Currently watching with family');

END $$;

-- 7. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@moviemind.com' OR email LIKE '%@example.com';

    -- Delete in dependency order (children first, then auth.users last)
    DELETE FROM public.watchlist_items WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Clean up sample movies
    DELETE FROM public.movies WHERE tmdb_id IN (550, 13, 157336);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;