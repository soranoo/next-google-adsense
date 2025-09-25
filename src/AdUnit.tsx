"use client";

// ref: https://github.com/btk/nextjs-google-adsense/blob/master/src/components/ResponsiveAdUnit.tsx
// ref: https://medium.com/frontendweb/how-to-add-google-adsense-in-your-nextjs-89e439f74de3

import assertNever from "assert-never";
import { usePathname } from "next/navigation";
// biome-ignore lint/correctness/noUnusedImports: React refers to a UMD global, but the current file is a module.
import React, { useEffect } from "react";
import {
  type Layout as AdLayout,
  Display as AdLayout_Display,
  InArticle as AdLayout_InArticle,
} from "./AdLayout";
import {
  ARTICLE_AD_SIZES,
  type ArticleAdSize,
  DISPLAY_AD_SIZES,
  type DisplayAdSize,
  isPublisherId,
  isSlotId,
} from "./utils";

type AdUnitProps<TLayout extends AdLayout> = {
  publisherId?: string;
  slotId: string;
  layout: TLayout;
  comment?: string;
} & (
  | {
      layout: "display";
      dummySize?: DisplayAdSize | { width: number; height: number };
      customLayout?: never;
    }
  | {
      layout: "in-article";
      dummySize?: ArticleAdSize | { width: number; height: number };
      customLayout?: never;
    }
  | {
      layout: "custom";
      dummySize?: never;
      customLayout: JSX.Element;
    }
);

/**
 * @param publisherId - Google AdSense publisher ID
 * @param slotId - Google AdSense slot ID
 * @param layout - Google AdSense ad unit layout
 * @param comment - Comment for the unit, it will be used to generate a unique key for the unit, easier to debug
 */
export const AdUnit = <TLayout extends AdLayout>({
  publisherId,
  slotId,
  layout = "display" as TLayout,
  customLayout,
  comment = "regular",
  dummySize,
}: AdUnitProps<TLayout>): JSX.Element | null => {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Refresh ads when pathname changes
  useEffect(() => {
    // biome-ignore lint/suspicious/noAssignInExpressions: adsbygoogle needed
    // biome-ignore lint/suspicious/noExplicitAny: needed to cast to any in order to access adsbygoogle
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, [pathname]);

  const _publisherId =
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? publisherId;

  if (!isPublisherId(_publisherId) || !isSlotId(slotId)) {
    console.error(
      "❌ [next-google-adsense] Invalid publisherId or slotId found for the unit.",
    );
    return null;
  }

  const clientId = `ca-${_publisherId}`;

  let Ad: JSX.Element;

  switch (layout) {
    case "display": {
      const dSize =
        typeof dummySize === "string"
          ? DISPLAY_AD_SIZES[dummySize as DisplayAdSize]
          : dummySize;
      Ad = (
        <AdLayout_Display
          dataAdClient={clientId}
          dataAdSlot={slotId}
          dummySize={dSize}
        />
      );
      break;
    }
    case "in-article": {
      const dSize =
        typeof dummySize === "string"
          ? ARTICLE_AD_SIZES[dummySize as ArticleAdSize]
          : dummySize;
      Ad = (
        <AdLayout_InArticle
          dataAdClient={clientId}
          dataAdSlot={slotId}
          dummySize={dSize}
        />
      );
      break;
    }
    case "custom":
      if (!customLayout) {
        console.error(
          "❌ [next-google-adsense] Custom layout is not provided for the unit.",
        );
        return null;
      }
      Ad = customLayout;
      break;
    default:
      assertNever(layout);
  }

  //? There empty object is used nothing but to make sure the
  //? empty object can be passed via .push, see: https://github.com/soranoo/next-google-adsense/issues/6

  return (
    <div
      key={`${pathname.replace(/\//g, "-")}-${slotId}-${comment.replace(" ", "-")}`}
    >
      {Ad}
    </div>
  );
};
