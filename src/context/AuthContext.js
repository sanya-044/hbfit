 import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { ALLOWED_DOMAIN } from '../config/constants';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('User');
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check initial session & handle OAuth redirect hash tokens
    checkInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await processAuthenticatedUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkInitialSession = async () => {
    try {
      // 1. Check if token parameters exist in URL hash (Supabase web OAuth return)
      if (typeof window !== 'undefined' && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          if (data?.user) {
            // Clean the token hash from the URL bar for a clean UI
            window.history.replaceState({}, document.title, window.location.pathname);
            await processAuthenticatedUser(data.user);
            setLoading(false);
            return;
          }
        }
      }

      // 2. Fallback to standard Supabase session check
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await processAuthenticatedUser(session.user);
      }
    } catch (e) {
      console.error('Session error:', e);
    } finally {
      setLoading(false);
    }
  };

  const processAuthenticatedUser = async (authUser) => {
    const email = authUser.email || '';
    const domain = email.split('@')[1];

    if (domain !== ALLOWED_DOMAIN) {
      setAuthError(`Access restricted. Only @${ALLOWED_DOMAIN} accounts are authorized.`);
      await supabase.auth.signOut();
      setUser(null);
      setLoading(false);
      return false;
    }

    const role = email.startsWith('admin') ? 'Admin' : 'User';

    const { data: dbUser } = await supabase
      .from('users')
      .upsert({
        id: authUser.id,
        email: email,
        full_name: authUser.user_metadata?.full_name || email.split('@')[0],
        role: role,
        domain: domain,
        last_login: new Date().toISOString(),
      })
      .select()
      .single();

    const activeUser = {
      id: authUser.id,
      email: email,
      name: dbUser?.full_name || authUser.user_metadata?.full_name || email.split('@')[0],
      role: dbUser?.role || role,
      domain: domain,
    };

    setUser(activeUser);
    setUserRole(activeUser.role);

    if (activeUser.role === 'Admin') {
      const { data } = await supabase.from('users').select('*').order('last_login', { ascending: false });
      if (data) setAllUsers(data);
    }

    return true;
  };

  // Direct Supabase OAuth Sign In
  const loginWithGoogle = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://hbfit.vercel.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: currentOrigin,
        },
      });
      if (error) throw error;
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const simulateLogin = async (email) => {
    setLoading(true);
    setAuthError(null);
    const domain = email.split('@')[1];

    if (domain !== ALLOWED_DOMAIN) {
      setAuthError(`Access restricted. Only @${ALLOWED_DOMAIN} accounts are authorized.`);
      setUser(null);
      setLoading(false);
      return;
    }

    const simulatedRole = email.startsWith('admin') ? 'Admin' : 'User';
    const mockUser = {
      id: 'sim-' + Date.now(),
      email: email,
      name: email.split('@')[0].toUpperCase(),
      role: simulatedRole,
      domain: domain,
    };

    // Save simulated user into Supabase table too!
    await supabase.from('users').upsert({
      id: mockUser.id,
      email: mockUser.email,
      full_name: mockUser.name,
      role: mockUser.role,
      domain: mockUser.domain,
      last_login: new Date().toISOString(),
    });

    setUser(mockUser);
    setUserRole(simulatedRole);

    if (simulatedRole === 'Admin') {
      const { data } = await supabase.from('users').select('*').order('last_login', { ascending: false });
      setAllUsers(data || []);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setAuthError(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        allUsers,
        loading,
        authError,
        loginWithGoogle,
        simulateLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}