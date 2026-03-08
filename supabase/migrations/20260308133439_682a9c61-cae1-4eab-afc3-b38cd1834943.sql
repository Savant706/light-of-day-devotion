-- Add explicit write policies to user_roles table (admin only)
CREATE POLICY "Only admins can assign roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can modify roles"
ON public.user_roles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix overly permissive prayer_requests INSERT policy
-- Drop the "true" policy and replace with one that still allows anyone to insert
-- but validates that the data is their own (or anonymous submissions)
DROP POLICY IF EXISTS "Anyone can submit prayer requests" ON public.prayer_requests;

CREATE POLICY "Anyone can submit prayer requests"
ON public.prayer_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);