
-- Add 'operator' to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'operator';

-- Create operators table for operator-specific details
CREATE TABLE public.operators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  assigned_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage operators" ON public.operators
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Operators can view own profile" ON public.operators
  FOR SELECT USING (auth.uid() = user_id);

-- Add operator assignment to applications
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS assigned_operator_id UUID REFERENCES public.operators(id);
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS epan_url TEXT;

-- Status logs table
CREATE TABLE public.status_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.status_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all status logs" ON public.status_logs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Operators can view assigned app logs" ON public.status_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.applications a
      JOIN public.operators o ON a.assigned_operator_id = o.id
      WHERE a.id = status_logs.application_id AND o.user_id = auth.uid()
    )
  );

CREATE POLICY "Operators can insert logs for assigned apps" ON public.status_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications a
      JOIN public.operators o ON a.assigned_operator_id = o.id
      WHERE a.id = application_id AND o.user_id = auth.uid()
    )
  );

-- Email logs table
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage email logs" ON public.email_logs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add RLS policy for operators to view/update assigned applications
CREATE POLICY "Operators can view assigned applications" ON public.applications
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (
      SELECT 1 FROM public.operators o
      WHERE o.user_id = auth.uid() AND public.applications.assigned_operator_id = o.id
    )
  );

CREATE POLICY "Operators can update assigned applications" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.operators o
      WHERE o.user_id = auth.uid() AND public.applications.assigned_operator_id = o.id
    )
  );

-- Trigger for operators updated_at
CREATE TRIGGER update_operators_updated_at
  BEFORE UPDATE ON public.operators
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
