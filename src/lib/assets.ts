import type { ImageMetadata } from "astro";

import { assetMap } from "@/generated/assets.generated";

export interface CompactImageWindowConfig {
  minWidth: string;
  maxWidth: string;
  padding: string;
  fit: "contain" | "cover";
  aspectRatio: string;
  crop?: boolean;
}

export function resolveImage(asset?: string) {
  if (!asset) {
    return undefined;
  }

  return assetMap.get(asset.replace(/^\/+/, ""));
}

export function requireImage(asset: string) {
  const image = resolveImage(asset);

  if (!image) {
    throw new Error(`Missing image asset: ${asset}`);
  }

  return image;
}

export function shouldUseCompactImageCard(
  image: Pick<ImageMetadata, "width" | "height">,
  minDimension = 900
) {
  return Math.min(image.width, image.height) < minDimension;
}

export function getCompactImageWindowConfig(
  image: Pick<ImageMetadata, "width" | "height">
): CompactImageWindowConfig {
  const ratio = image.width / image.height;
  const nativeAspectRatio = `${image.width} / ${image.height}`;

  if (ratio < 0.58) {
    return {
      minWidth: "7.8rem",
      maxWidth: "8.8rem",
      padding: "0",
      fit: "cover",
      aspectRatio: "4 / 5",
      crop: true
    };
  }

  if (ratio < 0.9) {
    return {
      minWidth: "8.6rem",
      maxWidth: "9.8rem",
      padding: "0",
      fit: "contain",
      aspectRatio: nativeAspectRatio
    };
  }

  if (ratio <= 1.2) {
    return {
      minWidth: "9.8rem",
      maxWidth: "11.2rem",
      padding: "0",
      fit: "contain",
      aspectRatio: nativeAspectRatio
    };
  }

  if (ratio <= 2) {
    return {
      minWidth: "11rem",
      maxWidth: "13.2rem",
      padding: "0",
      fit: "contain",
      aspectRatio: nativeAspectRatio
    };
  }

  return {
    minWidth: "12.2rem",
    maxWidth: "14.2rem",
    padding: "0",
    fit: "cover",
    aspectRatio: "3 / 2",
    crop: true
  };
}
