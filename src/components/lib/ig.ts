import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { InstagramMediaType, InstagramPost } from './types';

type InstagramApiPost = {
  id?: string;
  media_type?: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
};

type InstagramFallbackPost = {
  id?: string;
  mediaType?: InstagramMediaType;
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink?: string;
  caption?: string;
};

let instagramPostsPromise: Promise<InstagramPost[]> | undefined;

function normalizeInstagramPost(
  post: InstagramApiPost | InstagramFallbackPost,
): InstagramPost | null {
  const mediaType = 'media_type' in post ? post.media_type : post.mediaType;
  const mediaUrl = 'media_url' in post ? post.media_url : post.mediaUrl;
  const thumbnailUrl =
    'thumbnail_url' in post ? post.thumbnail_url : post.thumbnailUrl;

  if (!post.id || !mediaType || !mediaUrl || !post.permalink) {
    return null;
  }

  const normalizedMediaUrl = mediaUrl.startsWith('http')
    ? mediaUrl
    : `/img/${mediaUrl}`;
  const normalizedThumbnailUrl = thumbnailUrl
    ? thumbnailUrl.startsWith('http')
      ? thumbnailUrl
      : `/img/${thumbnailUrl}`
    : undefined;

  return {
    id: post.id,
    media_type: mediaType,
    media_url: normalizedMediaUrl,
    thumbnail_url: normalizedThumbnailUrl,
    permalink: post.permalink,
    caption: post.caption,
  };
}

async function getFallbackInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const fallbackPath = join(process.cwd(), 'public', 'ig-fallback.json');
    const fallbackContent = await readFile(fallbackPath, 'utf-8');
    const fallbackPosts = JSON.parse(fallbackContent) as InstagramFallbackPost[];

    return fallbackPosts
      .map((post) => normalizeInstagramPost(post))
      .filter((post): post is InstagramPost => post !== null);
  } catch (error) {
    console.error('IG fallback error:', error);
    return [];
  }
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  if (instagramPostsPromise) {
    return instagramPostsPromise;
  }

  instagramPostsPromise = loadInstagramPosts();
  return instagramPostsPromise;
}

async function loadInstagramPosts(): Promise<InstagramPost[]> {
  const token = import.meta.env.IG_ACCESS_TOKEN;

  if (!token) {
    console.warn(
      'Falta la variable de entorno IG_ACCESS_TOKEN. Usando ig-fallback.json.',
    );
    return getFallbackInstagramPosts();
  }

  try {
    const endpoint = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=3&access_token=${token}`;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(`Failed to fetch Instagram posts: ${res.statusText}`);
    }

    const json = (await res.json()) as { data?: InstagramApiPost[] };
    const posts = (json.data || [])
      .map((post) => normalizeInstagramPost(post))
      .filter((post): post is InstagramPost => post !== null);

    if (posts.length === 0) {
      console.warn('Instagram devolvio 0 posts. Usando ig-fallback.json.');
      return getFallbackInstagramPosts();
    }

    return posts;
  } catch (error) {
    console.error('IG fetch error:', error);
    return getFallbackInstagramPosts();
  }
}
