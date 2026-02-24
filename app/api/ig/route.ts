import { NextResponse } from 'next/server';

type InstagramPost = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
};

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null;
  return value as Record<string, unknown>;
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizePosts(data: unknown): InstagramPost[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      const obj = asObject(item);
      if (!obj) return null;

      const mediaTypeRaw = obj.media_type ?? obj.mediaType;
      const mediaType =
        mediaTypeRaw === 'VIDEO' || mediaTypeRaw === 'CAROUSEL_ALBUM'
          ? mediaTypeRaw
          : 'IMAGE';

      const post: InstagramPost = {
        id: String(obj.id ?? ''),
        media_type: mediaType,
        mediaUrl: readString(obj.mediaUrl ?? obj.media_url),
        thumbnailUrl: readString(obj.thumbnailUrl ?? obj.thumbnail_url) || undefined,
        permalink: readString(obj.permalink),
        caption: readString(obj.caption) || undefined,
      };

      return post;
    })
    .filter(
      (post): post is InstagramPost =>
        Boolean(post && post.id && post.permalink && (post.mediaUrl || post.thumbnailUrl))
    );
}

export async function GET() {
  try {
    const res = await fetch('https://giving-sunrise-e8474a0478.strapiapp.com/api/ig', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(normalizePosts(data));
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
