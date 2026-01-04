'use client';

import { useEffect, useState } from 'react';
import IgPost from '../ui/IgPost';
import IgButton from '../ui/IgButton';

import { getInstagramPosts } from '@/app/lib/ig';

type InstagramPost = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
};

function getCoverUrl(post: InstagramPost) {
  return post.thumbnailUrl ?? post.mediaUrl;
}

export default function Instagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
    const data = await getInstagramPosts<InstagramPost[]>();
        if (data) setPosts(data);
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="bg-noise bg-filmo-black-100 z-10 flex w-full overflow-x-hidden py-32 pl-44 max-md:flex-col max-md:gap-12 max-md:py-12 max-md:px-0 max-[1400px]:pl-16">
      <div className="flex w-[40%] flex-col gap-16 max-md:w-full max-md:items-center max-md:gap-6 max-md:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-figtree text-filmo-soft-white text-2xl font-medium uppercase max-md:text-center max-md:text-lg">
            Instagram
          </h1>
          <h1 className="font-garamond text-filmo-white text-[80px] leading-20 font-extrabold max-md:w-full max-md:text-center max-md:text-5xl max-md:leading-none">
            Sigue de cerca <br /> nuestro trabajo
          </h1>
        </div>

        <IgButton />
      </div>

      <div className="w-[70%] max-md:w-full flex-1">
        <div className="relative flex max-md:overflow-x-auto gap-4 -right-42 max-[1400px]:-right-16 max-md:right-0 max-md:gap-0 *:shrink-0 scroll-smooth">
          {posts.map((post) => (
            <IgPost
              pic={getCoverUrl(post)}
              url={post.permalink}
              type={post.media_type}
              key={post.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
