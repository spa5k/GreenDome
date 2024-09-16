import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define font classes based on edition IDs using Tailwind CSS
const fontClasses: { [key: number]: string } = {
  120: "font-uthmanic", // Tailwind class for Uthmanic font
  145: "font-indopak", // Tailwind class for IndoPak font
  146: "font-arabic_noto", // Tailwind class for default font
  62: "font-indopak", // Tailwind class for primary font
};

export const AyahText = (
  { text, editionId, className, number, fallbackText, ...props }: {
    text: string;
    editionId: number;
    className?: string;
    number: number;
    fallbackText: string;
    [x: string]: any;
  },
) => {
  const fontClass = fontClasses[editionId] || "font-primary";

  const combinedClassName = twMerge(clsx(fontClass, className, "ayah_text", "text-pretty", "leading-loose"));

  const handleCopy = (event: React.ClipboardEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    event.clipboardData.setData("text/plain", fallbackText);
  };

  return (
    <div>
      <p
        className={combinedClassName}
        dir="rtl"
        onCopy={handleCopy}
        {...props}
      >
        {text}
      </p>
      <p
        style={{ position: "absolute", left: "-9999px", top: "0", visibility: "hidden" }}
        aria-hidden="true"
        className="hidden"
      >
        {fallbackText}
      </p>
    </div>
  );
};
