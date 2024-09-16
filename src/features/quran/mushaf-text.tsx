"use client";
import clsx from "clsx";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { loadFont } from "./utils/fontLoader";

const MushafText = ({ page, text, type = "v1", className, fallbackText, ...props }: {
  page: string;
  text: string;
  type?: "v1" | "v2";
  className?: string;
  fallbackText: string;
  [x: string]: any;
}) => {
  const paddedPage = page.padStart(3, "0");

  useEffect(() => {
    loadFont(paddedPage, type);
  }, [paddedPage, type]);

  const fontFamily = `${type === "v1" ? "Mushaf_Page" : "Mushaf2_Page"}_${paddedPage}`;

  // if text contains "number,", or any number with comma then delete it
  text = text.replace(/(\d+),/g, "");

  const combinedClassName = twMerge(clsx(className, "ayah_text", "text-pretty", "leading-loose"));

  const handleCopy = async (event: React.ClipboardEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    try {
      await navigator.clipboard.writeText(fallbackText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <p
        style={{ fontFamily: `'${fontFamily}', sans-serif`, wordBreak: "break-all" }}
        className={combinedClassName}
        dir="rtl"
        onCopy={handleCopy}
        {...props}
      >
        {text}
      </p>
    </div>
  );
};

// Memoize the component
export default React.memo(MushafText);
