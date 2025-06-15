import React from 'react';
import DiscoveryTabs from './social/DiscoveryTabs';
import HomeFeed from './social/HomeFeed';
import ComposeButton from './social/ComposeButton';

const SocialFeed = () => {
  return (
    <div className="flex-1 w-full flex flex-col items-center pt-4 h-full">
      <DiscoveryTabs />
      <HomeFeed />
      <ComposeButton />
    </div>
  );
};

export default SocialFeed; 