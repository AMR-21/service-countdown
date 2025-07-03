import { cn } from "@/lib/utils";
import { PlusAnchors } from "./plus-anchors";

export default function DiagonalPattern({
  className,
  children,
  anchors = true,
}: {
  className?: string;
  small?: boolean;
  children?: React.ReactNode;
  anchors?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-8 w-full shrink-0 bg-[image:repeating-linear-gradient(315deg,_var(--diagonals)_0,_var(--diagonals)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed",
        className
      )}
    >
      <div
        className={cn(
          "border-border relative container mx-auto h-full w-full xl:max-w-6xl",
          anchors && ""
        )}
      >
        {anchors && (
          <>
            <PlusAnchors upper />
            <PlusAnchors />
          </>
        )}
        {children}
      </div>
    </div>
  );
}
