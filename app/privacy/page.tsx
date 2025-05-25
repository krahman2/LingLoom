"use client";

import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </div>

      <main className="w-full max-w-3xl mt-20 p-8 bg-white text-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">Last updated: [Insert Current Date, e.g., May 24, 2025]</p>

        <p className="mb-4">
          Welcome to LingLoom! This Privacy Policy explains how LingLoom ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you use our application (the "Service"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.
        </p>
        <p className="mb-4">
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways. The information we may collect via the Service includes:
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
        <p className="mb-4">
          Personally identifiable information, such as your name, username, email address, password (hashed), and demographic information (such as your age, gender, hometown, and interests), that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service, such as online chat and message boards.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Derivative Data</h3>
        <p className="mb-4">
          Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service. If you are using our mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies to a post, and other interactions with the Service and other users via server log files.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Financial Data</h3>
        <p className="mb-4">
          [Specify if you collect financial data, e.g., for subscriptions. If not, state "We do not collect financial information." or remove this section.] Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Service. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Stripe, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Data From Social Networks</h3>
        <p className="mb-4">
          User information from social networking sites, such as Google, Facebook, Apple, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. This information may also include the contact information of anyone you invite to use and/or join the Service.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Mobile Device Data</h3>
        <p className="mb-4">
          [If applicable, e.g., if you have a native mobile app and request specific permissions] Device information such as your mobile device ID number, model, and manufacturer, and information about the location of your device, if you access the Service from a mobile device.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Data</h3>
        <p className="mb-4">
          Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Service permission to access this information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Service.</li>
          <li>Improve the efficiency and operation of the Service.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
          <li>Notify you of updates to the Service.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
          <li>Perform other business activities as needed.</li>
          <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          <li>Process payments and refunds.</li>
          <li>Request feedback and contact you about your use of the Service.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Respond to product and customer service requests.</li>
          <li>Send you a newsletter.</li>
          <li>Solicit support for the Service.</li>
          <li>[Add any other specific uses for your application]</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Disclosure of Your Information</h2>
        <p className="mb-4">
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">By Law or to Protect Rights</h3>
        <p className="mb-4">
          If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Service Providers</h3>
        <p className="mb-4">
          We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. (e.g., Firebase for authentication and database, Stripe for payment processing).
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Marketing Communications</h3>
        <p className="mb-4">
          [State your policy: With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.]
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Interactions with Other Users</h3>
        <p className="mb-4">
          If you interact with other users of the Service, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs. [Specify what is visible]
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Online Postings</h3>
        <p className="mb-4">
          When you post comments, contributions or other content to the Service, your posts may be viewed by all users and may be publicly distributed outside the Service in perpetuity.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Advertisers</h3>
        <p className="mb-4">
          [Specify if you use third-party advertisers. If so, explain that they may use cookies etc. e.g., We may use third-party advertising companies to serve ads when you visit the Service. These companies may use information about your visits to the Service and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.]
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Affiliates</h3>
        <p className="mb-4">
          [Specify if you share with affiliates. e.g., We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.]
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Business Transfers</h3>
        <p className="mb-4">
          If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Tracking Technologies</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">Cookies and Web Beacons</h3>
        <p className="mb-4">
          [Explain your use of cookies, web beacons, etc. e.g., We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Service to help customize the Service and improve your experience. For more information on how we use cookies, please refer to our Cookie Policy [if you have one, link it] or this section.] Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Service.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Analytics</h3>
        <p className="mb-4">
          [Specify if you use analytics partners, e.g., We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the Service through the use of first party cookies and third-party cookies, to, among other things, analyze and track users' use of the Service, determine the popularity of certain content, and better understand online activity.]
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Websites</h2>
        <p className="mb-4">
          The Service may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Service, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Security of Your Information</h2>
        <p className="mb-4">
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Policy for Children</h2>
        <p className="mb-4">
          We do not knowingly solicit information from or market to children under the age of 13 [Adjust age as per legal requirements, e.g., 16 in Europe/GDPR]. If you become aware of any data we have collected from children under age 13 [or applicable age], please contact us using the contact information provided below.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Controls for Do-Not-Track Features</h2>
        <p className="mb-4">
          Most web browsers and some mobile operating systems include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Your Privacy Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your personal information. These may include the right to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
        </ul>
        <p className="mb-4">If you wish to exercise any of these rights, please contact us.</p>
        <p className="mb-4">[Optional: Add specific sections for GDPR, CCPA, etc., if applicable and you have the detailed text for them. E.g., "If you are a resident of the European Economic Area (EEA), you have certain data protection rights..."]</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4">
          LingLoom Support<br />
          seasonedruslan@gmail.com<br />
          [Optional: Your Physical Address or Link to a Contact Form Page]
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