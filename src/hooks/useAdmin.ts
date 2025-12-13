import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AdminState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export function useAdmin() {
  const [state, setState] = useState<AdminState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAdmin = async (userId: string) => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      return !!data;
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        if (session?.user) {
          // Use setTimeout to avoid deadlock
          setTimeout(async () => {
            const isAdmin = await checkAdmin(session.user.id);
            setState(prev => ({
              ...prev,
              isAdmin,
              isLoading: false,
            }));
          }, 0);
        } else {
          setState(prev => ({
            ...prev,
            isAdmin: false,
            isLoading: false,
          }));
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        const isAdmin = await checkAdmin(session.user.id);
        setState(prev => ({
          ...prev,
          isAdmin,
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
