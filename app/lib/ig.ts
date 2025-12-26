export async function getInstagramPosts<T>() : Promise<T | null> {
  try {
    const res = await fetch('/api/ig');

    if (!res.ok) {
      throw new Error('Failed to fetch Instagram posts');
    }

    return await res.json();
  } catch (error) {
    console.error('IG fetch error:', error);
    return null;
  }
}