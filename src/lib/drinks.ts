import { drinksModules } from "@/generated/content.generated";

type ContentComponent = any;

export interface DrinkIngredient {
  amount: string;
  ingredient: string;
  notes?: string;
}

export interface DrinkData {
  title: string;
  slug: string;
  description: string;
  menuSection: string;
  baseSpirit: string;
  tags: string[];
  heroImage?: string;
  glassware?: string;
  garnish?: string;
  method?: string;
  ingredients: DrinkIngredient[];
  instructions: string[];
  searchTerms: string[];
  sortOrder: number;
  inStock: boolean;
  updatedAt?: Date;
  draft: boolean;
}

export interface DrinkEntry {
  id: string;
  data: DrinkData;
  Content: ContentComponent;
}

type DrinkFrontmatter = Omit<DrinkData, "updatedAt"> & {
  updatedAt?: string | Date;
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

function createDrinkEntry(
  id: string,
  frontmatter: DrinkFrontmatter,
  Content: ContentComponent
): DrinkEntry {
  return {
    id,
    Content,
    data: {
      ...frontmatter,
      tags: frontmatter.tags ?? [],
      ingredients: frontmatter.ingredients ?? [],
      instructions: frontmatter.instructions ?? [],
      searchTerms: frontmatter.searchTerms ?? [],
      sortOrder: frontmatter.sortOrder ?? 100,
      inStock: frontmatter.inStock ?? true,
      updatedAt: asDate(frontmatter.updatedAt),
      draft: frontmatter.draft ?? false
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

export const drinks: DrinkEntry[] = loadEntries(
  drinksModules as ContentModule<DrinkFrontmatter>[],
  createDrinkEntry
);

export function sortDrinks(entries: DrinkEntry[]) {
  const preSorted = [...entries].sort((left, right) => {
    if (left.data.sortOrder !== right.data.sortOrder) {
      return left.data.sortOrder - right.data.sortOrder;
    }

    return left.data.title.localeCompare(right.data.title);
  });
  const sectionOrder = new Map<string, number>();

  preSorted.forEach((entry) => {
    if (!sectionOrder.has(entry.data.menuSection)) {
      sectionOrder.set(entry.data.menuSection, sectionOrder.size);
    }
  });

  return [...preSorted].sort((left, right) => {
    const leftOrder = sectionOrder.get(left.data.menuSection) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = sectionOrder.get(right.data.menuSection) ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    if (left.data.sortOrder !== right.data.sortOrder) {
      return left.data.sortOrder - right.data.sortOrder;
    }

    return left.data.title.localeCompare(right.data.title);
  });
}

export function getPublishedDrinks() {
  return sortDrinks(drinks.filter((entry) => !entry.data.draft));
}

export function getDrinkBySlug(slug?: string) {
  return getPublishedDrinks().find((entry) => entry.data.slug === slug);
}

export function collectDrinkSections(entries: DrinkEntry[]) {
  return [...new Set(sortDrinks(entries).map((entry) => entry.data.menuSection))];
}

export function collectDrinkBaseSpirits(entries: DrinkEntry[]) {
  return [...new Set(sortDrinks(entries).map((entry) => entry.data.baseSpirit))];
}
