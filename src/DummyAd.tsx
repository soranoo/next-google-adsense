// biome-ignore lint/correctness/noUnusedImports: React refers to a UMD global, but the current file is a module.
import React, { type CSSProperties } from "react";

interface DummyAdProps {
  size: { width: number; height: number };
  responsive?: boolean;
  style?: CSSProperties;
  className?: string;
  label?: string;
}

/**
 * A simple dummy ad component for development purposes
 * Only renders when dummyAdSize is explicitly provided
 */
export const DummyAd = ({
  size: { width, height },
  responsive = false,
  style = {},
  className = "",
  label = "Advertisement",
}: DummyAdProps): JSX.Element => {
  const containerStyle: CSSProperties = {
    backgroundColor: "#f5f5f5",
    border: "2px dashed #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    minHeight: responsive ? "50px" : `${height}px`,
    ...style,
  };

  if (responsive) {
    containerStyle.width = "100%";
    containerStyle.maxWidth = `${width}px`;
    containerStyle.aspectRatio = `${width} / ${height}`;
  } else {
    containerStyle.width = `${width}px`;
    containerStyle.height = `${height}px`;
  }

  return (
    <div className={`dummy-ad ${className}`} style={containerStyle}>
      <div>
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "12px", opacity: 0.7 }}>
          {width} × {height}
          {responsive && " (Responsive)"}
        </div>
      </div>
    </div>
  );
};
