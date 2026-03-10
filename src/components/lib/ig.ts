import type { InstagramPost } from './types';

function resolveStrapiBaseUrl() {
  const raw = (import.meta.env.PUBLIC_STRAPI_URL ?? '').trim().replace(/^['"]|['"]$/g, '');

  if (!raw) {
    throw new Error('Missing PUBLIC_STRAPI_URL environment variable.');
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(raw)) {
    return `http://${raw}`;
  }

  return `https://${raw}`;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const endpoint = new URL('/api/ig', resolveStrapiBaseUrl()).toString();
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error('Failed to fetch Instagram posts');
    }

    return (await res.json()) as InstagramPost[];
  } catch (error) {
    console.error('IG fetch error:', error);
    return [];
  }
}
