import type { InstagramPost } from './types';

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = import.meta.env.IG_ACCESS_TOKEN;

  if (!token) {
    console.warn('Falta la variable de entorno IG_ACCESS_TOKEN.');
    return [];
  }

  try {
    const endpoint = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=3&access_token=${token}`;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(`Failed to fetch Instagram posts: ${res.statusText}`);
    }

    const json = await res.json();
    return (json.data as InstagramPost[]) || [];
  } catch (error) {
    console.error('IG fetch error:', error);
    return [];
  }
}
