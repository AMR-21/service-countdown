import { differenceInDays } from "date-fns";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { getTargetDate } from "@/lib/utils";

export function BgPattern() {
	const { month } = useMonth();
	const { year } = useYear();
	const target = getTargetDate(month, year);
	const diff = differenceInDays(target, Date.now());
	return (
		<div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-5 select-none pointer-events-none -rotate-12 scale-125">
			{Array.from({ length: 100 }).map((_, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: <>
					key={i}
					className="font-ruqaa text-4xl whitespace-nowrap text-muted-foreground"
				>
					{diff <= 90 ? "رديف" : "عَدَّادُ المِيرِي"}
				</span>
			))}
		</div>
	);
}
