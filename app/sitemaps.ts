import type { MetadataRoute } from 'next';
import { getStrapiData } from '@/app/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: 'https://filmostudio.com/',
    lastModified: new Date(),
    priority: 1,
  });

  urls.push({
    url: 'https://filmostudio.com/portafolio',
    lastModified: new Date(),
    priority: 0.8,
  });

  const schools = await getStrapiData('/api/schools/slugs');

  for (const school of schools) {
    urls.push({
      url: `https://filmostudio.com/portafolio/${school.slug}`,
      priority: 0.7,
    });

    const proms = await getStrapiData(`/api/schools/${school.slug}/proms`);

    for (const prom of proms) {
      urls.push({
        url: `https://filmostudio.com/portafolio/${school.slug}/proms/${prom.prom}`,
        priority: 0.6,
      });
    }
  }

  return urls;
}
