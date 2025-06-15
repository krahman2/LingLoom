import React from 'react';
import Image from 'next/image';

const ProfileHeader = () => {
  return (
    <div className="relative h-40 bg-gradient-to-r from-primary to-accent rounded-lg">
        <div className="absolute bottom-0 left-4 translate-y-1/2">
            <Image src="/images/logo.png" alt="User Avatar" width={96} height={96} className="rounded-full border-4 border-black" />
        </div>
    </div>
  );
};
export default ProfileHeader; 