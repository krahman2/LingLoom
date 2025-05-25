"use client";

import Link from "next/link";
import Image from "next/image";

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </div>

      <main className="w-full max-w-3xl mt-20 p-8 bg-white text-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        <p className="mb-4">Last updated: [Insert Current Date, e.g., May 24, 2025]</p>

        <p className="mb-4">
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the LingLoom application (the "Service") operated by LingLoom ("us", "we", or "our").
        </p>
        <p className="mb-4">
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
        <p className="mb-4">
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
        </p>
        <p className="mb-4">
          You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>
        <p className="mb-4">
          You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Intellectual Property</h2>
        <p className="mb-4">
          The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of LingLoom and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of LingLoom.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Content</h2>
        <p className="mb-4">
          Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
        </p>
        <p className="mb-4">
          By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
        </p>
        <p className="mb-4">
          You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
        </p>
        <p className="mb-4">
          We reserve the right to terminate the account of anyone found to be infringing on a copyright.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Prohibited Uses</h2>
        <p className="mb-4">You may use the Service only for lawful purposes and in accordance with Terms. You agree not to use the Service:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate LingLoom, a LingLoom employee, another user, or any other person or entity.</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm or offend LingLoom or users of the Service or expose them to liability.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <p className="mb-4">
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service, or request data deletion as per our Data Deletion Policy.
        </p>
        <p className="mb-4">
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Links To Other Web Sites</h2>
        <p className="mb-4">
          Our Service may contain links to third-party web sites or services that are not owned or controlled by LingLoom.
        </p>
        <p className="mb-4">
          LingLoom has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that LingLoom shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
        </p>
        <p className="mb-4">
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Limitation Of Liability</h2>
        <p className="mb-4">
          In no event shall LingLoom, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Disclaimer</h2>
        <p className="mb-4">
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
        </p>
        <p className="mb-4">
            LingLoom its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">9. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
        </p>
        <p className="mb-4">
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">10. Changes</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <p className="mb-4">
          By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <p className="mb-4">
          By email: seasonedruslan@gmail.com<br />
          [Optional: By visiting a page on our website: [Link to Contact Page]]
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