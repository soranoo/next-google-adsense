import type { DetailedHTMLProps } from "react";
// biome-ignore lint/style/useImportType: needed in the <ins> tag
import React from "react";
import { DummyAd } from "./DummyAd";
import { isDevelopment } from "./utils";

export type Layout = "display" | "in-article" | "custom";

interface AdLayoutProps
  extends DetailedHTMLProps<
    React.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement
  > {
  dataAdClient: string;
  dataAdSlot: string;
  dummySize?: { width: number; height: number };
}

interface DisplayProps extends AdLayoutProps {
  responsive?: boolean;
}

export const Display = ({
  responsive,
  dataAdClient,
  dataAdSlot,
  dummySize,
  ...props
}: DisplayProps) => {
  if (dummySize && isDevelopment()) {
    return <DummyAd label="Display Ad" size={dummySize} {...props} />;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="auto"
      data-full-width-responsive={responsive ?? true}
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      {...props}
    />
  );
};

interface InArticleProps extends AdLayoutProps {}

export const InArticle = ({
  dataAdClient,
  dataAdSlot,
  dummySize,
  ...props
}: InArticleProps) => {
  if (dummySize && isDevelopment()) {
    return <DummyAd label="In-Article Ad" size={dummySize} {...props} />;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      {...props}
    />
  );
};
