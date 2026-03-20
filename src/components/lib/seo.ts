const DEFAULT_SITE_URL = 'https://www.filmostudio.com';

function sanitizeEnvValue(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function ensureAbsoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(value)) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export function getSiteUrl(): string {
  const envSiteUrl = sanitizeEnvValue(import.meta.env.PUBLIC_SITE_URL ?? '');

  if (!envSiteUrl) {
    return DEFAULT_SITE_URL;
  }

  return ensureAbsoluteUrl(envSiteUrl);
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) {
    return getSiteUrl();
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(normalizedPath, getSiteUrl()).toString();
}

export function normalizeCanonicalPath(path = '/'): string {
  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}
