import { cn } from "@/lib/utils";

export const DomeMask = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <div
      className={cn(
        // color (changed to a green hue)
        "[--color:hsl(150,50%,50%)]",
        "pointer-events-none relative -z-[2] mx-auto h-[50rem] overflow-hidden",
        // sphere mask (adjusted for more curvature)
        "[mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_70%)]",
        // reverse
        reverse ? "my-[-22rem] rotate-180 md:mt-[-30rem]" : "my-[-18.8rem]",
        // before (adjusted opacity for more visibility)
        "before:absolute before:inset-0 before:h-full before:w-full before:opacity-60 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_80%)]",
        // after
        "after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background",
      )}
    >
    </div>
  );
};
