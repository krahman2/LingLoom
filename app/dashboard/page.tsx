'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
        // Optional: Further check for email verification if needed here for direct access
        // if (currentUser.email && !currentUser.emailVerified) {
        //   router.push('/verify-email');
        // }
      } else {
        router.push('/login'); // Not logged in, redirect to login
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect in onAuthStateChanged
    // but as a fallback:
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Welcome to the Dashboard!</h1>
        <p className="mb-2 text-gray-700">You are logged in as:</p>
        <p className="mb-4 font-semibold text-gray-900">{user.email || user.phoneNumber || user.displayName || 'User'}</p>
        {user.email && (
          <p className="mb-4 text-sm text-gray-700">
            Email Verified: {user.emailVerified ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
            {!user.emailVerified && (
              <Link href="/verify-email" className="ml-2 text-blue-500 hover:underline">
                (Verify Now)
              </Link>
            )}
          </p>
        )}
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 