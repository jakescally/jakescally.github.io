import { recipesModules } from "@/generated/content.generated";
import { parseQuantity, type RecipeQuantity } from "@/lib/recipe-units";

type ContentComponent = any;

export interface RecipeIngredient extends RecipeQuantity {
  item: string;
  note?: string;
  group?: string;
}

export interface RecipeStep {
  text: string;
  /** Optional timer in minutes. */
  timer?: number;
}

export interface RecipeData {
  title: string;
  slug: string;
  description?: string;
  category: string;
  cuisine?: string;
  tags: string[];
  servings: number;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  heroImage?: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  source?: string;
  sourceUrl?: string;
  updatedAt?: Date;
  draft: boolean;
}

export interface RecipeEntry {
  id: string;
  data: RecipeData;
  Content: ContentComponent;
}

interface RecipeFrontmatter {
  title: string;
  slug: string;
  description?: string;
  category: string;
  cuisine?: string;
  tags?: string[];
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  heroImage?: string;
  ingredients?: Array<{
    qty?: number | string;
    unit?: string;
    item: string;
    note?: string;
    grams?: number;
    group?: string;
  }>;
  steps?: Array<string | { text: string; timer?: number }>;
  source?: string;
  sourceUrl?: string;
  updatedAt?: string | Date;
  draft?: boolean;
}

function createRecipeEntry(
  id: string,
  frontmatter: RecipeFrontmatter,
  Content: ContentComponent
): RecipeEntry {
  return {
    id,
    Content,
    data: {
      ...frontmatter,
      tags: frontmatter.tags ?? [],
      servings: frontmatter.servings ?? 1,
      ingredients: (frontmatter.ingredients ?? []).map(({ qty, ...rest }) => ({
        ...rest,
        ...parseQuantity(qty)
      })),
      steps: (frontmatter.steps ?? []).map((step) =>
        typeof step === "string" ? { text: step } : step
      ),
      updatedAt: frontmatter.updatedAt ? new Date(frontmatter.updatedAt) : undefined,
      draft: frontmatter.draft ?? false
    }
  };
}

export const recipes: RecipeEntry[] = (
  recipesModules as Array<{ id: string; default: ContentComponent; frontmatter: RecipeFrontmatter }>
).map((module) => createRecipeEntry(module.id, module.frontmatter, module.default));

function sortRecipes(entries: RecipeEntry[]) {
  return [...entries].sort(
    (left, right) =>
      left.data.category.localeCompare(right.data.category) ||
      left.data.title.localeCompare(right.data.title)
  );
}

/** Published recipes. Drafts are included while running `npm run dev` so you can preview them. */
export function getRecipes() {
  return sortRecipes(recipes.filter((entry) => !entry.data.draft || import.meta.env.DEV));
}

export function getRecipeBySlug(slug?: string) {
  return getRecipes().find((entry) => entry.data.slug === slug);
}

export function collectValues(entries: RecipeEntry[], pick: (entry: RecipeEntry) => string[]) {
  return [...new Set(entries.flatMap(pick).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function totalMinutes(data: RecipeData) {
  return data.totalTime ?? ((data.prepTime ?? 0) + (data.cookTime ?? 0) || undefined);
}

export function formatMinutes(minutes?: number) {
  if (!minutes) {
    return undefined;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (!hours) {
    return `${rest} min`;
  }

  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
