import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';
import sharp from 'sharp';
import type {
  HomeSchool,
  HomeSchoolWithProm,
  PortfolioImage,
  PortfolioSchool,
  PromDetail,
  SchoolDetail,
  SchoolLogos,
} from './types';

type SchoolEntry = CollectionEntry<'schools'>;
type PromEntry = CollectionEntry<'proms'>;

const PROM_MEDIA_URL_PREFIX = '/media/proms/';
const PROM_MEDIA_ROOT = path.resolve(process.cwd(), 'public/media/proms');
const GALLERY_FILE_PATTERN = /^(\d+)(?:-cover)?\.(avif|jpe?g|png|webp)$/i;
const promPicsCache = new Map<string, Promise<PortfolioImage[]>>();

async function getSchoolEntries(): Promise<SchoolEntry[]> {
  return (await getCollection('schools'))
    .filter((entry) => entry.data.published)
    .sort((a, b) => a.data.priority - b.data.priority);
}

async function getPromEntries(): Promise<PromEntry[]> {
  return (await getCollection('proms')).filter((entry) => entry.data.published);
}

function getPromKey(schoolSlug: string, promId: number): string {
  return `${schoolSlug}-${promId}`;
}

function getSchoolLogos(school: SchoolEntry['data']): SchoolLogos {
  const fallback = school.logos?.color ?? school.logo ?? '';

  return {
    color: school.logos?.color ?? fallback,
    black: school.logos?.black ?? fallback,
    grayscale: school.logos?.grayscale ?? fallback,
    white: school.logos?.white ?? fallback,
  };
}

function resolvePromMediaDirectory(mediaPath: string): string {
  if (!mediaPath.startsWith(PROM_MEDIA_URL_PREFIX)) {
    throw new Error(
      `Prom mediaPath must start with "${PROM_MEDIA_URL_PREFIX}": ${mediaPath}`,
    );
  }

  const relativePath = mediaPath.slice(PROM_MEDIA_URL_PREFIX.length);
  const directory = path.resolve(PROM_MEDIA_ROOT, relativePath);
  const isInsidePromMediaRoot = directory.startsWith(`${PROM_MEDIA_ROOT}${path.sep}`);

  if (!isInsidePromMediaRoot) {
    throw new Error(`Invalid prom mediaPath: ${mediaPath}`);
  }

  return directory;
}

async function discoverPromPics(mediaPath: string): Promise<PortfolioImage[]> {
  const directory = resolvePromMediaDirectory(mediaPath);
  const entries = await readdir(directory, { withFileTypes: true });
  const galleryFiles = entries
    .filter((entry) => entry.isFile() && GALLERY_FILE_PATTERN.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      order: Number(entry.name.match(GALLERY_FILE_PATTERN)?.[1]),
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  if (galleryFiles.length === 0) {
    throw new Error(`No numbered gallery images found in ${mediaPath}.`);
  }

  return Promise.all(
    galleryFiles.map(async ({ name, order }) => {
      const metadata = await sharp(path.join(directory, name)).metadata();

      if (!metadata.width || !metadata.height) {
        throw new Error(`Could not read image dimensions for ${mediaPath}/${name}.`);
      }

      return {
        id: order,
        url: `${mediaPath}/${name}`,
        width: metadata.width,
        height: metadata.height,
      };
    }),
  );
}

function getPromPics(mediaPath: string): Promise<PortfolioImage[]> {
  const cachedPics = promPicsCache.get(mediaPath);

  if (cachedPics) return cachedPics;

  const pics = discoverPromPics(mediaPath);
  promPicsCache.set(mediaPath, pics);
  return pics;
}

export async function getHomeSchools(): Promise<HomeSchool[]> {
  const [schools, proms] = await Promise.all([
    getSchoolEntries(),
    getPromEntries(),
  ]);
  const promByKey = new Map(
    proms.map((entry) => [
      getPromKey(entry.data.schoolSlug, entry.data.promId),
      entry.data,
    ]),
  );

  return schools.map(({ data: school }) => {
    const featuredProm = promByKey.get(
      getPromKey(school.slug, school.featuredPromId ?? -1),
    );

    return {
      slug: school.slug,
      name: school.name,
      priority: school.priority,
      logos: getSchoolLogos(school),
      cover: school.cover,
      prom: featuredProm
        ? { id: featuredProm.promId, cover: featuredProm.cover }
        : null,
    };
  });
}

export function hasFeaturedProm(
  school: HomeSchool,
): school is HomeSchoolWithProm {
  return school.prom !== null;
}

export async function getPortfolioSchools(): Promise<PortfolioSchool[]> {
  return (await getSchoolEntries()).map(({ data: school }) => ({
    id: school.slug,
    name: school.name,
    priority: school.priority,
    logos: getSchoolLogos(school),
    cover: school.cover,
  }));
}

export async function getSchoolSlugs(): Promise<string[]> {
  return (await getSchoolEntries()).map(({ data }) => data.slug);
}

export async function getSchoolDetail(
  slug: string,
): Promise<SchoolDetail | undefined> {
  const [schools, proms] = await Promise.all([
    getSchoolEntries(),
    getPromEntries(),
  ]);
  const school = schools.find((entry) => entry.data.slug === slug)?.data;

  if (!school) return undefined;

  const promById = new Map(
    proms
      .filter((entry) => entry.data.schoolSlug === slug)
      .map((entry) => [entry.data.promId, entry.data]),
  );

  return {
    id: school.slug,
    name: school.name,
    logos: getSchoolLogos(school),
    cover: school.cover,
    proms: school.promIds.map((promId) => {
      const prom = promById.get(promId);

      if (!prom) {
        throw new Error(`Prom ${promId} not found for ${school.slug}.`);
      }

      return { id: prom.promId, cover: prom.cover };
    }),
  };
}

export async function getAllPromRoutes(): Promise<
  Array<{ schoolSlug: string; promId: number }>
> {
  return (await getPromEntries())
    .map(({ data }) => ({
      schoolSlug: data.schoolSlug,
      promId: data.promId,
    }))
    .sort((a, b) =>
      a.schoolSlug.localeCompare(b.schoolSlug) || b.promId - a.promId,
    );
}

export async function getPromDetail(
  schoolSlug: string,
  promId: number,
): Promise<PromDetail | undefined> {
  const entry = (await getPromEntries()).find(
    ({ data }) =>
      data.schoolSlug === schoolSlug && data.promId === promId,
  );

  if (!entry) return undefined;

  const pics = await getPromPics(entry.data.mediaPath);

  return {
    id: entry.data.promId,
    text: entry.data.text,
    subText: entry.data.subText ?? null,
    videoId: entry.data.videoId,
    pics,
  };
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

export function capitalizeSlug(slug: string): string {
  if (!slug) return '';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
