import type { SVGProps } from "react";

export function SurahIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M5 6h34s4 2 4 7s-4 7-4 7H5s4-2 4-7s-4-7-4-7m38 22H9s-4 2-4 7s4 7 4 7h34s-4-2-4-7s4-7 4-7"
      >
      </path>
    </svg>
  );
}

export function JuzIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect width="3.5" height="13" x=".55" y=".5" rx=".5"></rect>
        <rect width="3.5" height="11" x="4.05" y="2.5" rx=".5"></rect>
        <rect width="3" height="11" x="9.26" y="2.3" rx=".5" transform="rotate(-14.05 10.779 7.795)"></rect>
        <path d="M.55 10h3.5m0-1h3.5m2.5 2l2.88-.72"></path>
      </g>
    </svg>
  );
}
