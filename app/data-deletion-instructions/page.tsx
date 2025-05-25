"use client";

import Link from "next/link";
import Image from "next/image";

export default function DataDeletionInstructionsPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </div>

      <main className="w-full max-w-3xl mt-20 p-8 bg-white text-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Data Deletion Instructions</h1>
        <p className="mb-4">Last updated: [Insert Current Date, e.g., May 24, 2025]</p>

        <p className="mb-4">
          You have the right to request the deletion of your personal data associated with your LingLoom account. We are committed to protecting your privacy and ensuring you have control over your information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">How to Request Data Deletion</h2>
        <p className="mb-4">
          To request the deletion of your data, please send an email to our support team at <a href="mailto:seasonedruslan@gmail.com" className="text-primary hover:underline">seasonedruslan@gmail.com</a> with the subject line: <strong className="font-semibold">"Data Deletion Request - LingLoom"</strong>.
        </p>
        <p className="mb-4">
          In your email, please include the following information to help us promptly identify your account and process your request:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Your full name (as registered with LingLoom).</li>
          <li>The email address associated with your LingLoom account.</li>
          <li>A clear statement confirming that you wish for all your personal data associated with your LingLoom account to be deleted.</li>
          <li>(Optional) The reason for your deletion request (this helps us improve our services, but is not required).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Process and Timeline</h2>
        <p className="mb-4">
          Once we receive your request, we will send you a confirmation email to verify your identity and the authenticity of the request. This step is crucial to prevent unauthorized deletions.
        </p>
        <p className="mb-4">
          Upon successful verification, we will process your data deletion request within <strong>14 business days</strong>. We will notify you by email once the deletion is complete.
        </p>
        <p className="mb-4">
          Please note that deleting your data is irreversible and will result in the permanent loss of your account, learning progress, and any other information associated with your LingLoom profile.
        </p>
        <p className="mb-4">
          Some anonymized or aggregated data may be retained for statistical purposes, but this will not be personally identifiable. Additionally, certain information may be retained if required by law or for legitimate, documented business purposes (e.g., transaction records for accounting, records of compliance with legal obligations).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Questions?</h2>
        <p className="mb-4">
            If you have any questions about this data deletion process, please contact us at <a href="mailto:seasonedruslan@gmail.com" className="text-primary hover:underline">seasonedruslan@gmail.com</a>.
        </p>

        <p className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            Go back to Home
          </Link>
        </p>
      </main>
    </div>
  );
} 