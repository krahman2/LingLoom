import React from 'react';
import Image from 'next/image';
import { MessageCircle, Repeat, ThumbsUp, Bookmark } from 'lucide-react';

const PostCard = () => {
    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-4 backdrop-blur-sm">
            {/* Attribution Ribbon */}
            <div className="flex items-center mb-3">
                <Image src="/images/flags/bangladesh.png" alt="User flag" width={24} height={24} className="rounded-full mr-3" />
                <div>
                    <p className="font-bold text-white text-sm">LingLoom User <span className="text-gray-400 font-normal text-xs">@lingloom_user</span></p>
                    <p className="text-xs text-gray-400">Streak: 14 🔥 | Level: B1</p>
                </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-200 mb-4 text-sm">
                Just learned that in Bangla, the word for "tomorrow" (আগামীকাল) and "yesterday" (গতকাল) are aaaaaaalmost the same! You just rely on the verb tense. Wild! #FalseFriends
            </p>

            {/* Reactions */}
            <div className="flex justify-between text-gray-400 text-xs">
                <button className="flex items-center gap-2 hover:text-primary transition-colors"><ThumbsUp className="h-4 w-4" /> 12</button>
                <button className="flex items-center gap-2 hover:text-green-400 transition-colors"><MessageCircle className="h-4 w-4" /> 3</button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Repeat className="h-4 w-4" /> 5</button>
                <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors"><Bookmark className="h-4 w-4" /></button>
            </div>
        </div>
    );
};


const HomeFeed = () => {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-y-auto px-2 pb-24" style={{height: 'calc(100vh - 200px)'}}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
    </div>
  );
};

export default HomeFeed; 