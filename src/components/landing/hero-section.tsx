"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { SearchBar } from "./search-bar";

export default function HeroSection() {
  const ref = useRef(null);
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[100rem] px-6 text-center md:px-8 items-center"
    >
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Explore
        <br className="hidden md:block" /> The Quran
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Discover the wisdom and guidance of the Quran
        <br className="hidden md:block" /> with our interactive platform.
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]">
        <span>Get Started</span>
        <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Button>
      <div className="mt-12 w-full flex justify-center">
        <SearchBar />
      </div>
    </section>
  );
}
