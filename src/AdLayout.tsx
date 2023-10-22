import React from "react";

export type Layout = "display" | "in-article" | "custom";

type AdLayoutProps = {
  dataAdClient: string;
  dataAdSlot: string;
};

interface DisplayProps extends AdLayoutProps {
  responsive?: boolean;
}

export const Display = (props: DisplayProps) => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="auto"
      data-full-width-responsive={props.responsive ?? true}
      data-ad-client={props.dataAdClient}
      data-ad-slot={props.dataAdSlot}
    />
  );
};

interface InArticleProps extends AdLayoutProps {}

export const InArticle = (props: InArticleProps) => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={props.dataAdClient}
      data-ad-slot={props.dataAdSlot}
    />
  );
};
