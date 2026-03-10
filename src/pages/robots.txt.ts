import type { APIRoute } from 'astro';
import { toAbsoluteUrl } from '@/components/lib/seo';

export const GET: APIRoute = () => {
  const sitemapUrl = toAbsoluteUrl('/sitemap.xml');

  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
