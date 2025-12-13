-- Fix RLS policies for leads table - change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;

CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can manage leads" 
ON public.leads 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix RLS policies for assessments table
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can manage assessments" ON public.assessments;

CREATE POLICY "Anyone can create assessments" 
ON public.assessments 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can manage assessments" 
ON public.assessments 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));