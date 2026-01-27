-- Create daily verses table
CREATE TABLE public.daily_verses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    verse_reference TEXT NOT NULL,
    verse_text TEXT NOT NULL,
    devotional TEXT NOT NULL,
    prayer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prayer requests table
CREATE TABLE public.prayer_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    prayer_request TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.daily_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Daily verses: Anyone can read, only admins can modify
CREATE POLICY "Anyone can view daily verses" 
ON public.daily_verses FOR SELECT 
USING (true);

-- Security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE POLICY "Admins can insert daily verses" 
ON public.daily_verses FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update daily verses" 
ON public.daily_verses FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete daily verses" 
ON public.daily_verses FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Prayer requests: Anyone can submit, admins can view all
CREATE POLICY "Anyone can submit prayer requests" 
ON public.prayer_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view prayer requests" 
ON public.prayer_requests FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_daily_verses_updated_at
BEFORE UPDATE ON public.daily_verses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a sample verse for today
INSERT INTO public.daily_verses (date, verse_reference, verse_text, devotional, prayer)
VALUES (
    CURRENT_DATE,
    'Psalm 119:105',
    'Your word is a lamp for my feet, a light on my path.',
    'In our daily walk with God, His Word serves as our guiding light. Just as a lamp illuminates the path ahead, Scripture reveals the way we should go. When life feels uncertain or dark, we can trust that God''s truth will show us the next step. This verse reminds us that we don''t need to see the entire journey—just enough light for our feet, one step at a time. As we meditate on His Word each day, we find clarity, wisdom, and peace for the road ahead.',
    'Heavenly Father, thank You for the gift of Your Word. Help me to treasure Scripture and allow it to guide my steps today. When I face uncertainty, remind me to turn to Your truth. Illuminate my path and give me the courage to follow where You lead. In Jesus'' name, Amen.'
);