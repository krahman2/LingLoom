import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} className="h-8 w-8 md:h-10 md:w-10" />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </Link>
      {/* Add other header elements like navigation links or user profile button here in the future */}
    </header>
  );
} 