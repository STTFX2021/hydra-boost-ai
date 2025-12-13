-- Update handle_new_user function to auto-assign admin role to OWNER_EMAIL
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  owner_email TEXT;
BEGIN
  -- Get owner email from settings, fallback to empty if not set
  SELECT COALESCE((value_json->>'owner_email')::text, '') INTO owner_email
  FROM public.settings
  WHERE key = 'branding'
  LIMIT 1;

  -- Create profile for the new user
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;

  -- Auto-assign admin role if email matches owner_email
  IF NEW.email = owner_email AND owner_email != '' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert or update branding settings with owner_email placeholder
INSERT INTO public.settings (key, value_json)
VALUES ('branding', '{"company_name": "HydrAI Services", "owner_email": ""}')
ON CONFLICT (key) DO UPDATE 
SET value_json = jsonb_set(
  COALESCE(settings.value_json, '{}'::jsonb),
  '{company_name}',
  '"HydrAI Services"'
);