import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_STRAPI_BASE_URL = 'https://giving-sunrise-e8474a0478.strapiapp.com';
const OUTPUT_PATH = path.resolve(process.cwd(), 'src/data/strapi-cache.json');

function sanitizeEnvValue(value) {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function resolveBaseUrl() {
  const rawBaseUrl =
    process.env.STRAPI_BASE_URL ?? process.env.PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_BASE_URL;
  const baseUrl = sanitizeEnvValue(rawBaseUrl);

  if (/^https?:\/\//i.test(baseUrl)) {
    return baseUrl;
  }

  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(baseUrl)) {
    return `http://${baseUrl}`;
  }

  return `https://${baseUrl}`;
}

function buildEndpoint(pathname) {
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

async function fetchJson(baseUrl, endpoint) {
  const response = await fetch(new URL(endpoint, baseUrl));

  if (!response.ok) {
    throw new Error(`Failed ${endpoint} (${response.status} ${response.statusText})`);
  }

  return response.json();
}

async function main() {
  const baseUrl = resolveBaseUrl();
  const endpoints = {};

  const coreEndpoints = ['/api/landing/home', '/api/portfolio', '/api/schools/slugs'];
  for (const endpoint of coreEndpoints) {
    endpoints[endpoint] = await fetchJson(baseUrl, endpoint);
  }

  const slugs = Array.isArray(endpoints['/api/schools/slugs']) ? endpoints['/api/schools/slugs'] : [];

  for (const school of slugs) {
    if (!school || typeof school.slug !== 'string' || school.slug.length === 0) {
      continue;
    }

    const schoolEndpoint = buildEndpoint(`/api/schools/${school.slug}`);
    endpoints[schoolEndpoint] = await fetchJson(baseUrl, schoolEndpoint);

    const promsEndpoint = buildEndpoint(`/api/schools/${school.slug}/proms`);
    const proms = await fetchJson(baseUrl, promsEndpoint);
    endpoints[promsEndpoint] = proms;

    if (!Array.isArray(proms)) {
      continue;
    }

    for (const prom of proms) {
      const promValue = prom?.prom;
      if (typeof promValue !== 'number' && typeof promValue !== 'string') {
        continue;
      }

      const promId = String(promValue);
      const promEndpoint = buildEndpoint(`/api/schools/${school.slug}/proms/${promId}`);
      endpoints[promEndpoint] = await fetchJson(baseUrl, promEndpoint);
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    endpointCount: Object.keys(endpoints).length,
    endpoints,
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');

  console.log(`Saved ${payload.endpointCount} endpoints to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
