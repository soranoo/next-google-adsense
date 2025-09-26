const PUBLISHER_ID_REGEX = /^pub-\d{16}$/;
const SLOT_ID_REGEX = /^\d{10}$/;

export const isPublisherId = (id: string | undefined): boolean => {
  if (typeof id !== "string") {
    return false;
  }
  return PUBLISHER_ID_REGEX.test(id);
};

export const isSlotId = (id: string | undefined): boolean => {
  if (typeof id !== "string") {
    return false;
  }
  return SLOT_ID_REGEX.test(id);
};

export const isDevelopment = (): boolean => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENV === "development"
  );
};

/**
 * Common Google AdSense ad sizes for display ads
 */
export const DISPLAY_AD_SIZES = {
  LEADERBOARD: { width: 728, height: 90 },
  BANNER: { width: 468, height: 60 },
  HALF_BANNER: { width: 234, height: 60 },
  MEDIUM_RECTANGLE: { width: 300, height: 250 },
  LARGE_RECTANGLE: { width: 336, height: 280 },
  VERTICAL_BANNER: { width: 120, height: 240 },
  WIDE_SKYSCRAPER: { width: 160, height: 600 },
  SKYSCRAPER: { width: 120, height: 600 },
  MOBILE_BANNER: { width: 320, height: 50 },
  LARGE_MOBILE_BANNER: { width: 320, height: 100 },
} as const;

/**
 * Common Google AdSense ad sizes for in-article ads
 */
export const ARTICLE_AD_SIZES = {
  SMALL_SQUARE: { width: 200, height: 200 },
  SQUARE: { width: 250, height: 250 },
  MEDIUM_RECTANGLE: { width: 300, height: 250 },
  LARGE_RECTANGLE: { width: 336, height: 280 },
} as const;

export type DisplayAdSize = keyof typeof DISPLAY_AD_SIZES;
export type ArticleAdSize = keyof typeof ARTICLE_AD_SIZES;
