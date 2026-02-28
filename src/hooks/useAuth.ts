import { useState, useEffect } from 'react';
import { SignInResult } from '../types';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkPuter = () => {
      if (window.puter && window.puter.auth) {
        setIsAuthReady(true);
        // Check if user is already accessible
        if (window.puter.auth.user) {
          setUser(window.puter.auth.user);
          setIsSignedIn(true);
        } else if (typeof window.puter.auth.isSignedIn === 'function' && window.puter.auth.isSignedIn()) {
             setIsSignedIn(true);
        }
      } else {
        setTimeout(checkPuter, 500);
      }
    };
    checkPuter();
  }, []);

  const signIn = async () => {
    if (!window.puter) return;
    try {
      const res: SignInResult = await window.puter.auth.signIn();
      console.log('Sign in result:', res);
      if (res && res.user) {
          setUser(res.user);
          setIsSignedIn(true);
          toast.success(`Welcome back, ${res.user.username}!`);
      } else if (window.puter.auth.user) {
          setUser(window.puter.auth.user);
          setIsSignedIn(true);
          toast.success(`Welcome back, ${window.puter.auth.user.username}!`);
      }
      return res;
    } catch (err: any) {
      console.error("Sign in failed", err);
      toast.error(`Sign in failed: ${err.message || 'Unknown error'}`);
      throw err;
    }
  };

  const signOut = async () => {
      if (window.puter && window.puter.auth && window.puter.auth.signOut) {
          await window.puter.auth.signOut();
          setUser(null);
          setIsSignedIn(false);
          toast.info('Signed out successfully');
      }
  }

  return { user, isSignedIn, signIn, signOut, isAuthReady };
}
