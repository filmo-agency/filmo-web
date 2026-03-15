import { readFile } from 'node:fs/promises';
import path from 'node:path';

type StrapiDataMode = 'remote' | 'local' | 'hybrid';

interface StrapiCachePayload {
  generatedAt: string;
  baseUrl: string;
  endpoints: Record<string, unknown>;
}

const STRAPI_CACHE_FILE_PATH = path.resolve(process.cwd(), 'src/data/strapi-cache.json');
const rawStrapiBaseUrl = import.meta.env.PUBLIC_STRAPI_URL ?? '';
const STRAPI_DATA_MODE = getStrapiDataMode(import.meta.env.STRAPI_DATA_MODE);
const STRAPI_MAX_RETRIES = 2;
const RETRYABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

export const STRAPI_BASE_URL = sanitizeEnvValue(rawStrapiBaseUrl);

let localCachePromise: Promise<StrapiCachePayload | null> | null = null;

function sanitizeEnvValue(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function getStrapiDataMode(value: string | undefined): StrapiDataMode {
  const normalized = (value ?? 'remote').trim().toLowerCase();

  if (normalized === 'local' || normalized === 'hybrid' || normalized === 'remote') {
    return normalized;
  }

  return 'remote';
}

function normalizeEndpoint(url: string): string {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    throw new Error('A Strapi endpoint is required.');
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    const parsedUrl = new URL(trimmedUrl);
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  }

  return trimmedUrl.startsWith('/') ? trimmedUrl : `/${trimmedUrl}`;
}

function resolveStrapiBaseUrl(): string {
  if (!STRAPI_BASE_URL) {
    throw new Error('Missing PUBLIC_STRAPI_URL environment variable.');
  }

  if (/^https?:\/\//i.test(STRAPI_BASE_URL)) {
    return STRAPI_BASE_URL;
  }

  // Assume local hostnames use HTTP by default; everything else uses HTTPS.
  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(STRAPI_BASE_URL)) {
    return `http://${STRAPI_BASE_URL}`;
  }

  return `https://${STRAPI_BASE_URL}`;
}

function resolveRemoteUrl(endpoint: string): string {
  return new URL(endpoint, resolveStrapiBaseUrl()).toString();
}

function shouldRetryStatus(status: number): boolean {
  return RETRYABLE_HTTP_STATUSES.has(status);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchWithRetry(url: string): Promise<Response> {
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= STRAPI_MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (response.ok || !shouldRetryStatus(response.status) || attempt === STRAPI_MAX_RETRIES) {
        return response;
      }

      const delayMs = 250 * 2 ** attempt;
      await wait(delayMs);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === STRAPI_MAX_RETRIES) {
        throw lastError;
      }

      const delayMs = 250 * 2 ** attempt;
      await wait(delayMs);
    }

    attempt += 1;
  }

  throw lastError ?? new Error('Unknown Strapi fetch error.');
}

async function loadLocalCache(): Promise<StrapiCachePayload | null> {
  if (!localCachePromise) {
    localCachePromise = readFile(STRAPI_CACHE_FILE_PATH, 'utf-8')
      .then((content: string) => JSON.parse(content) as StrapiCachePayload)
      .catch(() => null);
  }

  return localCachePromise;
}

async function getCachedResponse(endpoint: string): Promise<unknown | undefined> {
  const cache = await loadLocalCache();

  if (!cache || typeof cache.endpoints !== 'object' || !cache.endpoints) {
    return undefined;
  }

  return cache.endpoints[endpoint];
}

export async function getStrapiData<T>(url: string): Promise<T> {
  const endpoint = normalizeEndpoint(url);

  const cachedResponse = await getCachedResponse(endpoint);
  const hasCachedResponse = cachedResponse !== undefined;

  if (STRAPI_DATA_MODE === 'local') {
    if (hasCachedResponse) {
      return cachedResponse as T;
    }

    throw new Error(
      `No local cache entry found for "${endpoint}". Run "npm run strapi:cache" to generate src/data/strapi-cache.json.`,
    );
  }

  try {
    const response = await fetchWithRetry(resolveRemoteUrl(endpoint));

    if (!response.ok) {
      throw new Error(
        `Error fetching data from Strapi (${response.status}): ${response.statusText}`,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (hasCachedResponse) {
      console.warn(
        `Strapi request failed for "${endpoint}". Using cached data from ${STRAPI_CACHE_FILE_PATH}.`,
        error,
      );
      return cachedResponse as T;
    }

    throw error;
  }
}

export function toRoman(num: number): string {
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ];

  let result = '';

  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

export function capitalizeSlug(slug: string) {
  if (!slug) return '';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
