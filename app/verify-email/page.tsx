'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, sendEmailVerification, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Header from '@/components/ui/Header';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");
  const [isResending, setIsResending] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const checkVerification = useCallback(async (currentUser: User | null, initialCheck = false) => {
    if (currentUser) {
      if (!initialCheck) {
        setIsCheckingStatus(true);
        try {
          await currentUser.reload();
        } catch (reloadError: any) {
          console.error("Error reloading user:", reloadError);
          setError("Could not refresh status. Please try again or log out and log back in.");
          setIsCheckingStatus(false);
          return;
        }
      }
      const freshUser = auth.currentUser;
      if (freshUser && freshUser.emailVerified) {
        router.push('/dashboard');
      } else if (!initialCheck) {
        setMessage("Email is still not verified. Please check your inbox or resend the verification email.");
        setError(null);
      } else if (freshUser) {
        setMessage(`A verification email has been sent to ${freshUser.email}. Please check your inbox (and spam folder).`);
      }
      setIsCheckingStatus(false);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        checkVerification(currentUser, true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, checkVerification]);

  const handleResendVerificationEmail = async () => {
    if (!user) {
      setError("No user is currently logged in.");
      return;
    }
    setIsResending(true);
    setError(null);
    setMessage(null);
    try {
      await sendEmailVerification(user);
      setMessage("A new verification email has been sent. Please check your inbox.");
    } catch (err: any) {
      console.error("Error resending verification email:", err);
      setError(err.message || "Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleManualCheckVerification = async () => {
    if (auth.currentUser) {
      await checkVerification(auth.currentUser, false);
    } else {
      setError("You are not logged in. Please log in again.");
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }
  
  if (!user) {
     return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          Redirecting to login...
        </div>
      </div>
    );
  }

  if (user.emailVerified && loading) {
    router.push('/dashboard');
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          Email verified. Redirecting to dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-edge-glow bg-black bg-blend-screen text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Verify Your Email</h2>
          
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {!auth.currentUser?.emailVerified && (
            <p className="text-gray-700 mb-6">
              Please click the link in the verification email sent to{' '}
              <span className="font-semibold">{user.email}</span> to activate your account.
            </p>
          )}

          <Button 
            onClick={handleManualCheckVerification} 
            disabled={isCheckingStatus}
            className="w-full mb-3 text-gray-900"
            variant="outline"
          >
            {isCheckingStatus ? 'Checking Status...' : 'I\'ve Verified My Email, Continue'}
          </Button>

          <Button 
            onClick={handleResendVerificationEmail} 
            disabled={isResending}
            className="w-full mb-4"
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </Button>

          <p className="text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Already verified? Log In
            </Link>
          </p>
           <p className="text-sm mt-2">
            <Link href="/signup" className="text-primary hover:underline">
              Need to use a different email? Sign Up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 