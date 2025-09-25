import type { DetailedHTMLProps } from "react";
// biome-ignore lint/style/useImportType: needed in the <ins> tag
import React from "react";

export type Layout = "display" | "in-article" | "custom";

interface AdLayoutProps
  extends DetailedHTMLProps<
    React.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement
  > {
  dataAdClient: string;
  dataAdSlot: string;
}

interface DisplayProps extends AdLayoutProps {
  responsive?: boolean;
}

export const Display = ({
  responsive,
  dataAdClient,
  dataAdSlot,
  ...props
}: DisplayProps) => {
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
  ...props
}: InArticleProps) => {
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
