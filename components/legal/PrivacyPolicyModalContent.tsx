export default function PrivacyPolicyModalContent() {
  return (
    <div className='prose prose-sm max-h-[70vh] overflow-y-auto p-1'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Privacy Policy</h1>
      <p className='mb-2 text-xs'>Last updated: May 24, 2025</p>
      <p className='mb-2 text-xs'>
        Welcome to LingLoom! This Privacy Policy explains how LingLoom ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you use our application (the "Service").
      </p>
      <h2 className='text-xl font-semibold mt-3 mb-1.5'>Information We Collect</h2>
      <p className='mb-2 text-xs'>
        We collect information you provide directly to us, such as when you create an account (name, email, password).
        We also collect information automatically when you use the Service, like your IP address and usage data.
        If you connect via social networks (Google, Facebook, Apple), we may receive information from them based on your permissions.
      </p>
      <h2 className='text-xl font-semibold mt-3 mb-1.5'>How We Use Your Information</h2>
      <p className='mb-2 text-xs'>
        To operate and maintain the Service, create and manage your account, communicate with you, process transactions (if any, via Stripe), and improve our services.
      </p>
      <h2 className='text-xl font-semibold mt-3 mb-1.5'>Sharing Your Information</h2>
      <p className='mb-2 text-xs'>
        We may share information with third-party service providers (like Firebase for backend, Stripe for payments), if required by law, or in connection with a business transfer.
      </p>
      <h2 className='text-xl font-semibold mt-3 mb-1.5'>Your Privacy Rights</h2>
      <p className='mb-2 text-xs'>
        You may have rights to access, correct, or delete your personal data. Please contact us to make such requests.
      </p>
      <h2 className='text-xl font-semibold mt-3 mb-1.5'>Contact Us</h2>
      <p className='mb-2 text-xs'>
        If you have questions, contact LingLoom Support at seasonedruslan@gmail.com.
      </p>
    </div>
  );
} 