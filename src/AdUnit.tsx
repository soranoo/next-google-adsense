"use client";

// ref: https://github.com/btk/nextjs-google-adsense/blob/master/src/components/ResponsiveAdUnit.tsx
// ref: https://medium.com/frontendweb/how-to-add-google-adsense-in-your-nextjs-89e439f74de3

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isPublisherId, isSlotId } from "./utils";
import {
  type Layout as AdLayout,
  Display as AdLayout_Display,
  InArticle as AdLayout_InArticle,
} from "./AdLayout";

type AdUnitProps = {
  publisherId?: string;
  slotId: string;
  layout: AdLayout;
  customLayout?: JSX.Element;
  comment?: string;
};

/**
 * @param publisherId - Google AdSense publisher ID
 * @param slotId - Google AdSense slot ID
 * @param layout - Google AdSense ad unit layout
 * @param comment - Comment for the unit, it will be used to generate a unique key for the unit, easier to debug
 */
export const AdUnit = ({
  publisherId,
  slotId,
  layout = "display",
  customLayout,
  comment = "regular",
}: AdUnitProps): JSX.Element | null => {
  const pathname = usePathname();

  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

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
    case "display":
      Ad = <AdLayout_Display dataAdClient={clientId} dataAdSlot={slotId} />;
      break;
    case "in-article":
      Ad = <AdLayout_InArticle dataAdClient={clientId} dataAdSlot={slotId} />;
      break;
    case "custom":
      // TODO: add verification to custom layout
      if (!customLayout) {
        console.error(
          "❌ [next-google-adsense] Custom layout is not provided for the unit.",
        );
        return null;
      }
      Ad = customLayout;
      break;
    default:
      Ad = <AdLayout_Display dataAdClient={clientId} dataAdSlot={slotId} />;
      break;
  }

  if (!pathname) {
    return null;
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
