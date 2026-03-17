import {
  blogModules,
  photoSetsModules,
  projectsModules
} from "@/generated/content.generated";

type ContentComponent = any;

export interface BlogData {
  title: string;
  slug: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  topics: string[];
  heroImage: string;
  featured: boolean;
  draft: boolean;
  legacyPaths: string[];
  photoSetIds?: string[];
}

export interface ProjectData {
  title: string;
  slug: string;
  summary: string;
  year: number;
  status: "building" | "shipping" | "documenting" | "archived";
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
  heroImage: string;
  featured: boolean;
  detailMode: "card" | "case-study";
}

export interface PhotoSetImage {
  src: string;
  alt: string;
  caption?: string;
  exif?: string;
}

export interface PhotoSetData {
  title: string;
  slug: string;
  description: string;
  date?: Date;
  location?: string;
  camera?: string;
  coverImage: string;
  featured: boolean;
  legacyPaths: string[];
  images: PhotoSetImage[];
}

export interface BlogEntry {
  id: string;
  data: BlogData;
  Content: ContentComponent;
}

export interface ProjectEntry {
  id: string;
  data: ProjectData;
  Content: ContentComponent;
}

export interface PhotoSetEntry {
  id: string;
  data: PhotoSetData;
  Content: ContentComponent;
}

type BlogFrontmatter = Omit<BlogData, "publishedAt" | "updatedAt"> & {
  publishedAt: string | Date;
  updatedAt?: string | Date;
};

type ProjectFrontmatter = ProjectData;

type PhotoSetFrontmatter = Omit<PhotoSetData, "date"> & {
  date?: string | Date;
};

type ContentModule<TFrontmatter> = {
  id: string;
  default: ContentComponent;
  frontmatter: TFrontmatter;
};

function asDate(value: string | Date | undefined) {
  if (!value) {
    return undefined;
  }

  return value instanceof Date ? value : new Date(value);
}

function createBlogEntry(
  id: string,
  frontmatter: BlogFrontmatter,
  Content: ContentComponent
): BlogEntry {
  return {
    id,
    Content,
    data: {
      ...frontmatter,
      publishedAt: asDate(frontmatter.publishedAt) as Date,
      updatedAt: asDate(frontmatter.updatedAt),
      topics: frontmatter.topics ?? [],
      featured: frontmatter.featured ?? false,
      draft: frontmatter.draft ?? false,
      legacyPaths: frontmatter.legacyPaths ?? [],
      photoSetIds: frontmatter.photoSetIds
    }
  };
}

function createProjectEntry(
  id: string,
  frontmatter: ProjectFrontmatter,
  Content: ContentComponent
): ProjectEntry {
  return {
    id,
    Content,
    data: {
      ...frontmatter,
      stack: frontmatter.stack ?? [],
      links: frontmatter.links ?? {},
      featured: frontmatter.featured ?? false,
      detailMode: frontmatter.detailMode ?? "card"
    }
  };
}

function createPhotoSetEntry(
  id: string,
  frontmatter: PhotoSetFrontmatter,
  Content: ContentComponent
): PhotoSetEntry {
  return {
    id,
    Content,
    data: {
      ...frontmatter,
      date: asDate(frontmatter.date),
      featured: frontmatter.featured ?? false,
      legacyPaths: frontmatter.legacyPaths ?? [],
      images: frontmatter.images ?? []
    }
  };
}

function loadEntries<TFrontmatter, TEntry>(
  modules: ContentModule<TFrontmatter>[],
  createEntry: (id: string, frontmatter: TFrontmatter, Content: ContentComponent) => TEntry
) {
  return modules.map((module) =>
    createEntry(module.id, module.frontmatter, module.default)
  );
}

export const blogPosts: BlogEntry[] = loadEntries(
  blogModules as ContentModule<BlogFrontmatter>[],
  createBlogEntry
);
export const projects: ProjectEntry[] = loadEntries(
  projectsModules as ContentModule<ProjectFrontmatter>[],
  createProjectEntry
);
export const photoSets: PhotoSetEntry[] = loadEntries(
  photoSetsModules as ContentModule<PhotoSetFrontmatter>[],
  createPhotoSetEntry
);

export function getPublishedPosts() {
  return sortByDate(blogPosts.filter((entry) => !entry.data.draft));
}

export function getBlogPostBySlug(slug?: string) {
  return blogPosts.find((entry) => entry.data.slug === slug);
}

function sortProjects(entries: ProjectEntry[]) {
  return [...entries].sort((left, right) => {
    if (left.data.featured !== right.data.featured) {
      return left.data.featured ? -1 : 1;
    }

    if (left.data.year !== right.data.year) {
      return right.data.year - left.data.year;
    }

    return left.data.title.localeCompare(right.data.title);
  });
}

export function getProjects() {
  return sortProjects(projects);
}

export function getCaseStudyProjects() {
  return sortProjects(projects).filter((entry) => entry.data.detailMode === "case-study");
}

export function getProjectBySlug(slug?: string) {
  return projects.find((entry) => entry.data.slug === slug);
}

function sortPhotoSets(entries: PhotoSetEntry[]) {
  return [...entries].sort((left, right) => {
    if (left.data.featured !== right.data.featured) {
      return left.data.featured ? -1 : 1;
    }

    if (left.data.date && right.data.date) {
      return right.data.date.getTime() - left.data.date.getTime();
    }

    if (left.data.date && !right.data.date) {
      return -1;
    }

    if (!left.data.date && right.data.date) {
      return 1;
    }

    return left.data.title.localeCompare(right.data.title);
  });
}

export function getPhotoSets() {
  return sortPhotoSets(photoSets);
}

export function getPhotoSetById(id: string) {
  return photoSets.find((entry) => entry.id === id);
}

export function getPhotoSetBySlug(slug?: string) {
  return photoSets.find((entry) => entry.data.slug === slug);
}

export function sortByDate<T extends BlogEntry>(entries: T[]) {
  return [...entries].sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime()
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function collectTopics(entries: BlogEntry[]) {
  return [...new Set(entries.flatMap((entry) => entry.data.topics))].sort();
}

export function getRelatedPosts(entry: BlogEntry, entries: BlogEntry[]) {
  const topics = new Set(entry.data.topics);

  return sortByDate(
    entries
      .filter((candidate) => candidate.id !== entry.id)
      .map((candidate) => ({
        entry: candidate,
        score: candidate.data.topics.filter((topic) => topics.has(topic)).length
      }))
      .filter((candidate) => candidate.score > 0)
      .sort((left, right) => right.score - left.score)
      .map((candidate) => candidate.entry)
  ).slice(0, 3);
}
