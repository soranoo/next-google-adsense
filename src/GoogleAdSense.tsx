// ref: https://github.com/btk/nextjs-google-adsense/blob/master/src/components/GoogleAdSense.tsx
// ref: https://medium.com/frontendweb/how-to-add-google-adsense-in-your-nextjs-89e439f74de3

import type { ScriptProps } from "next/script";
import Script from "next/script";
import React from "react";
import { isPublisherId } from "./utils";

interface GoogleAdSenseProps extends Omit<ScriptProps, "src" | "id"> {
  publisherId?: string;
  debug?: boolean;
}

/**
 * @param publisherId - Google AdSense publisher ID, if not provided, it will use NEXT_PUBLIC_ADSENSE_PUBLISHER_ID from .env
 * @param debug - Google AdSense debug mode
 */
export const GoogleAdSense = ({
  publisherId,
  debug = false,
  ...props
}: GoogleAdSenseProps): JSX.Element | null => {
  const _publisherId =
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? publisherId;

  if (!isPublisherId(_publisherId)) {
    console.error(
      "❌ [next-google-adsense] Invalid publisherId. It should be like this: pub-xxxxxxxxxxxxxxxx, there is a total of 16 digits behind pub-",
    );
    return null;
  }

  return (
    <Script
      async={true}
      id="next-google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${_publisherId}${
        debug ? "google_console=1" : ""
      }`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      {...props}
    />
  );
};
