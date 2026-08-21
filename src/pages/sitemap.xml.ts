import type { APIRoute } from 'astro';
import { getAllPromRoutes, getSchoolSlugs } from '@/components/lib/content';
import { toAbsoluteUrl } from '@/components/lib/seo';

interface SitemapUrlItem {
  loc: string;
  lastmod?: string;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

function buildUrlTag(item: SitemapUrlItem): string {
  const tags = [
    `<loc>${item.loc}</loc>`,
    item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : '',
    item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : '',
    typeof item.priority === 'number'
      ? `<priority>${item.priority.toFixed(1)}</priority>`
      : '',
  ]
    .filter(Boolean)
    .join('');

  return `<url>${tags}</url>`;
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const urls: SitemapUrlItem[] = [
    {
      loc: toAbsoluteUrl('/'),
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: toAbsoluteUrl('/portafolio'),
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
  ];

  const [schoolSlugs, proms] = await Promise.all([
    getSchoolSlugs(),
    getAllPromRoutes(),
  ]);

  for (const slug of schoolSlugs) {
      urls.push({
        loc: toAbsoluteUrl(`/portafolio/${slug}`),
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.8,
      });
  }

  for (const prom of proms) {
    urls.push({
      loc: toAbsoluteUrl(`/portafolio/${prom.schoolSlug}/${prom.promId}`),
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    `${urls.map(buildUrlTag).join('')}` +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
