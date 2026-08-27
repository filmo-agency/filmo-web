export interface PortfolioImage {
  id: number;
  url: string;
  width: number;
  height: number;
}

export interface PromSummary {
  id: number;
  cover: string;
}

export interface SchoolLogos {
  black: string;
  color: string;
  grayscale: string;
  white: string;
}

export interface HomeSchool {
  slug: string;
  name: string;
  priority: number;
  logos: SchoolLogos;
  cover: string;
  prom: PromSummary | null;
}

export type HomeSchoolWithProm = HomeSchool & { prom: PromSummary };

export interface SchoolPreview {
  id: string;
  name: string;
  cover: string;
  logos: SchoolLogos;
  priority: number;
}

export interface PortfolioSchool extends SchoolPreview {}

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
  logos: SchoolLogos;
  cover: string;
  proms: SchoolPromPreview[];
}

export interface PromDetail {
  id: number;
  text?: string | null;
  subText: string | null;
  videoId?: string | null;
  pics: PortfolioImage[];
}
