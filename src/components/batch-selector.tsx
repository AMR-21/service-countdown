import { useCallback, useMemo } from "react";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import type { BATCHES } from "@/lib/constants";
import {
	formatNum,
	getRemainingBatches,
	getTargetDate,
	startTimer,
	verifyYear,
} from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function BatchSelector() {
	const { month, setMonth } = useMonth();
	const { year, setYear } = useYear();

	const curStartYear = new Date().getFullYear();
	const startYear = verifyYear(curStartYear) ? curStartYear : curStartYear + 1;

	const years = useMemo(
		() =>
			Array.from({ length: 11 }, (_, i) => {
				const year = startYear + i;
				return year.toString();
			}),
		[startYear],
	);

	const start = useCallback(
		(month: (typeof BATCHES)[number] | null, year: number | null) => {
			if (!month || !year) return;
			const target = getTargetDate(month, year);

			startTimer(target);
		},
		[],
	);

	const remainingBatches = useMemo(() => getRemainingBatches(year), [year]);

	return (
		<div className="border-b border-border grid text-xl grid-cols-[1fr_0.75fr_1fr] text-center items-center">
			<p className="py-2 px-3 border-l border-border text-foreground">دفعة</p>
			<div className="border-l h-full">
				<Select
					value={month}
					onValueChange={(v) => {
						setMonth(v as (typeof BATCHES)[number]);
						start(v as (typeof BATCHES)[number], year);
					}}
				>
					<SelectTrigger size="full">
						<SelectValue className="text-center text-lg">
							{(value: string | null) => (
								<>{value ? formatNum(+value) : "الشهر"}</>
							)}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{remainingBatches.map((item) => (
							<SelectItem className="text-sm" key={item} value={item}>
								{formatNum(+item)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="h-full">
				<Select
					value={year ? `${year}` : null}
					onValueChange={(v) => {
						if (!v) return;
						setYear(+v);
						start(month as (typeof BATCHES)[number], +v);
					}}
				>
					<SelectTrigger size="full">
						<SelectValue className="text-center text-lg">
							{(value: string | null) => (
								<>{value ? formatNum(+value) : "السنة"}</>
							)}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{years.map((item) => (
							<SelectItem className="text-sm" key={item} value={item}>
								{formatNum(+item)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
