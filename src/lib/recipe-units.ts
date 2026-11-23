/**
 * Recipe quantity parsing, scaling and unit conversion.
 * Shared by the server render and the in-browser servings/units controls.
 */

export type UnitMode = "original" | "us" | "metric";

export interface RecipeQuantity {
  /** Amount as written for the recipe's base servings (undefined = unscaled, e.g. "to taste"). */
  min?: number;
  /** Upper end of a range such as "2-3". */
  max?: number;
  /** Unit exactly as written. */
  unit?: string;
  /** Optional weight in grams for the written amount (lets volumes show as grams). */
  grams?: number;
}

type UnitKind = "volume" | "mass" | "count";

const VOLUME_ML: Record<string, number> = {
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 236.588,
  "fl oz": 29.5735,
  pint: 473.176,
  quart: 946.353,
  gallon: 3785.41,
  ml: 1,
  l: 1000
};

const MASS_G: Record<string, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592
};

const UNIT_ALIASES: Record<string, string> = {
  teaspoon: "tsp",
  teaspoons: "tsp",
  tsps: "tsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  tbsps: "tbsp",
  tbs: "tbsp",
  tbl: "tbsp",
  cups: "cup",
  "fluid ounce": "fl oz",
  "fluid ounces": "fl oz",
  floz: "fl oz",
  "fl. oz": "fl oz",
  pints: "pint",
  pt: "pint",
  quarts: "quart",
  qt: "quart",
  gallons: "gallon",
  gal: "gallon",
  milliliter: "ml",
  milliliters: "ml",
  millilitre: "ml",
  millilitres: "ml",
  liter: "l",
  liters: "l",
  litre: "l",
  litres: "l",
  gram: "g",
  grams: "g",
  gr: "g",
  kilogram: "kg",
  kilograms: "kg",
  kgs: "kg",
  ounce: "oz",
  ounces: "oz",
  pound: "lb",
  pounds: "lb",
  lbs: "lb"
};

const UNICODE_FRACTIONS: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875
};

const FRACTION_MARKS: Array<[number, string]> = [
  [0, ""],
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [7 / 8, "⅞"],
  [1, ""]
];

function canonicalUnit(unit?: string) {
  if (!unit) {
    return { key: "", kind: "count" as UnitKind };
  }

  const cleaned = unit.trim().toLowerCase().replace(/\.$/, "");
  const key = UNIT_ALIASES[cleaned] ?? cleaned;

  if (key in VOLUME_ML) {
    return { key, kind: "volume" as UnitKind };
  }

  if (key in MASS_G) {
    return { key, kind: "mass" as UnitKind };
  }

  return { key: unit.trim(), kind: "count" as UnitKind };
}

/** Parses 2, "2", "1.5", "1 1/2", "1½", "½", "2-3" or "2 to 3". */
export function parseQuantity(value: number | string | undefined | null) {
  if (value === undefined || value === null || value === "") {
    return {};
  }

  if (typeof value === "number") {
    return { min: value };
  }

  const parseSingle = (text: string) => {
    let total = 0;
    let matched = false;

    for (const part of text.trim().split(/\s+/)) {
      const unicode = [...part].find((character) => character in UNICODE_FRACTIONS);
      const numeric = unicode ? part.replace(unicode, "") : part;

      if (unicode) {
        total += UNICODE_FRACTIONS[unicode];
        matched = true;
      }

      if (!numeric) {
        continue;
      }

      if (numeric.includes("/")) {
        const [top, bottom] = numeric.split("/").map(Number);

        if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom === 0) {
          return undefined;
        }

        total += top / bottom;
        matched = true;
      } else {
        const number = Number(numeric);

        if (!Number.isFinite(number)) {
          return undefined;
        }

        total += number;
        matched = true;
      }
    }

    return matched ? total : undefined;
  };

  const [low, high] = value.split(/\s*(?:-|–|to)\s*/);
  const min = parseSingle(low);
  const max = high ? parseSingle(high) : undefined;

  return min === undefined ? {} : { min, max };
}

export function formatFraction(value: number) {
  if (value >= 100) {
    return String(Math.round(value));
  }

  if (value >= 10) {
    const rounded = Math.round(value * 2) / 2;
    return Number.isInteger(rounded) ? String(rounded) : `${Math.floor(rounded)}½`;
  }

  const whole = Math.floor(value);
  const rest = value - whole;
  let best = FRACTION_MARKS[0];

  for (const mark of FRACTION_MARKS) {
    if (Math.abs(mark[0] - rest) < Math.abs(best[0] - rest)) {
      best = mark;
    }
  }

  const wholePart = best[0] === 1 ? whole + 1 : whole;

  if (!wholePart && !best[1]) {
    return value > 0 ? "⅛" : "0";
  }

  return `${wholePart || ""}${best[1]}`;
}

function roundMetric(value: number) {
  if (value < 10) {
    return Math.round(value * 2) / 2;
  }

  if (value < 100) {
    return Math.round(value);
  }

  return Math.round(value / 5) * 5;
}

function formatMetric(base: number, max: number | undefined, kind: "g" | "ml") {
  const big = kind === "g" ? "kg" : "l";
  const useBig = (max ?? base) >= 1000;
  const toText = (value: number) =>
    useBig ? String(Math.round(value / 10) / 100) : String(roundMetric(value));

  return `${toText(base)}${max !== undefined ? `–${toText(max)}` : ""} ${useBig ? big : kind}`;
}

function joinRange(min: number, max: number | undefined, unit: string) {
  const amount = max !== undefined ? `${formatFraction(min)}–${formatFraction(max)}` : formatFraction(min);
  const shownTop = parseQuantity(formatFraction(max ?? min)).min ?? 0;
  const plural = unit === "cup" && shownTop > 1 ? "cups" : unit;
  return plural ? `${amount} ${plural}` : amount;
}

/** Best US volume unit for an amount in teaspoons, staying close to the true value. */
function pickUsVolume(tsp: number) {
  const options: Array<[string, number]> = [
    ["cup", 48],
    ["tbsp", 3],
    ["tsp", 1]
  ];

  for (const [unit, size] of options) {
    const amount = tsp / size;

    if (amount < (unit === "cup" ? 0.25 : 1)) {
      continue;
    }

    const text = formatFraction(amount);
    const shown = parseQuantity(text).min ?? amount;
    const awkwardCup = unit === "cup" && /[⅛⅜⅝⅞]/.test(text);

    if (!awkwardCup && Math.abs(shown - amount) / amount <= 0.06) {
      return { unit, size };
    }
  }

  return { unit: "tsp", size: 1 };
}

/** Text for a quantity scaled by `factor` and shown in `mode`. Empty when there is no amount. */
export function renderQuantity(quantity: RecipeQuantity, factor: number, mode: UnitMode) {
  if (quantity.min === undefined) {
    return "";
  }

  const min = quantity.min * factor;
  const max = quantity.max !== undefined ? quantity.max * factor : undefined;
  const grams = quantity.grams !== undefined ? quantity.grams * factor : undefined;
  const { key, kind } = canonicalUnit(quantity.unit);
  const written = quantity.unit?.trim() ?? "";

  if (kind === "count") {
    const count = joinRange(min, max, written);
    return mode === "metric" && grams !== undefined ? `${count} (${formatMetric(grams, undefined, "g")})` : count;
  }

  if (kind === "mass") {
    const toGrams = MASS_G[key];

    if (mode === "metric" || (mode === "original" && (key === "g" || key === "kg"))) {
      return formatMetric(min * toGrams, max !== undefined ? max * toGrams : undefined, "g");
    }

    if (mode === "original") {
      return joinRange(min, max, written);
    }

    const ounces = (min * toGrams) / MASS_G.oz;
    const maxOunces = max !== undefined ? (max * toGrams) / MASS_G.oz : undefined;

    return (maxOunces ?? ounces) >= 16
      ? joinRange(ounces / 16, maxOunces !== undefined ? maxOunces / 16 : undefined, "lb")
      : joinRange(ounces, maxOunces, "oz");
  }

  const toMl = VOLUME_ML[key];

  if (mode === "metric") {
    if (grams !== undefined && max === undefined) {
      return formatMetric(grams, undefined, "g");
    }

    return formatMetric(min * toMl, max !== undefined ? max * toMl : undefined, "ml");
  }

  if (mode === "original") {
    return key === "ml" || key === "l"
      ? formatMetric(min * toMl, max !== undefined ? max * toMl : undefined, "ml")
      : joinRange(min, max, written);
  }

  const tsp = (min * toMl) / VOLUME_ML.tsp;
  const maxTsp = max !== undefined ? (max * toMl) / VOLUME_ML.tsp : undefined;
  const { unit, size } = pickUsVolume(maxTsp ?? tsp);

  return joinRange(tsp / size, maxTsp !== undefined ? maxTsp / size : undefined, unit);
}
