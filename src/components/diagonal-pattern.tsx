import { cn } from "@/lib/utils";

export default function DiagonalPattern({
  className,
  children,
}: {
  className?: string;
  small?: boolean;
  children?: React.ReactNode;
  anchors?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-10 w-full shrink-0 bg-[image:repeating-linear-gradient(315deg,_var(--diagonals)_0,_var(--diagonals)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed",
        className
      )}
    >
      {children}
    </div>
  );
}
