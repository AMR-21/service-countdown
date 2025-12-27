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
				"h-8 w-full shrink-0 bg-[repeating-linear-gradient(315deg,var(--diagonals)_0,var(--diagonals)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed",
				className,
			)}
		>
			{children}
		</div>
	);
}
