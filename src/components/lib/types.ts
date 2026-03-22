export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface InstagramPost {
  id: string;
  media_type: InstagramMediaType;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  optimizedUrl: string;
  width: number;
  height: number;
}

export interface PromSummary {
  id: number;
  cover: string;
}

export interface HomeSchool {
  slug: string;
  name: string;
  priority: number;
  logo: string;
  cover: string;
  prom: PromSummary;
}

export interface LandingHomeResponse {
  schools: HomeSchool[];
}

export interface SchoolPreview {
  id: string;
  name: string;
  cover: string;
  logo: string;
  priority: number;
}

export interface PortfolioSchool extends SchoolPreview {}

export interface PortfolioResponse {
  schools: PortfolioSchool[];
}

export interface SchoolSlug {
  slug: string;
}

export interface SchoolPromRef {
  prom: number;
}

export interface SchoolPromPreview {
  id: number;
  cover: string;
}

export interface PromPreviewCard extends SchoolPromPreview {
  schoolSlug: string;
  schoolName: string;
}

export interface SchoolDetail {
  id: string;
  name: string;
  slug?: string;
  logo: string;
  cover: string;
  proms: SchoolPromPreview[];
}

export interface PromDetail {
  id: number;
  text?: string | null;
  subText: string | null;
  videoId?: string | null;
  pics: StrapiImage[];
}
