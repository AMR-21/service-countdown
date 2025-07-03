import { cn } from "@/lib/utils";

export function PlusAnchors({ upper }: { upper?: boolean }) {
  return (
    <>
      <div
        className={cn(
          "after:bg-border-anchor before:bg-border-anchor absolute -left-1.75 z-[50] flex size-[13px] items-center justify-center before:absolute before:top-1.5 before:h-0.25 before:w-full before:content-[''] after:absolute after:left-1.5 after:h-full after:w-0.25 after:content-['']",
          upper ? "-top-1.75" : "-bottom-1.75"
        )}
      />
      <div
        className={cn(
          "after:bg-border-anchor before:bg-border-anchor absolute -right-1.75 z-[9999] flex size-[13px] items-center justify-center before:absolute before:top-1.5 before:h-0.25 before:w-full before:content-[''] after:absolute after:left-1.5 after:h-full after:w-0.25 after:content-['']",
          upper ? "-top-1.75" : "-bottom-1.75"
        )}
      />
    </>
  );
}
