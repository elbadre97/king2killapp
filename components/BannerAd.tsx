import React from 'react';

interface BannerAdProps {
    t: any;
}

const BannerAd: React.FC<BannerAdProps> = ({ t }) => {
  return (
    <div className="fixed bottom-[84px] left-0 right-0 h-16 bg-gray-200 dark:bg-gray-900 z-20 flex items-center justify-center container mx-auto max-w-lg border-t border-b border-gray-300 dark:border-gray-700">
        <div className="text-center">
            {/* 
                TODO: Paste your ad provider's banner ad code here.
                For example, for Google AdSense, it might look like this:
                <ins class="adsbygoogle"
                     style="display:inline-block;width:320px;height:50px"
                     data-ad-client="ca-pub-your-client-id"
                     data-ad-slot="your-ad-slot-id"></ins>
                Make sure to include the provider's script in your index.html.
            */}
            <p className="text-gray-500 dark:text-gray-400 font-bold">{t.adLabel}</p>
        </div>
    </div>
  );
};

export default BannerAd;
