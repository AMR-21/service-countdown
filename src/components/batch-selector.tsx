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
import { InlineSelect } from "./inline-select";

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
			<div className="border-l border-border h-full">
				<InlineSelect
					value={month}
					onValueChange={(v) => {
						setMonth(v as (typeof BATCHES)[number]);
						start(v as (typeof BATCHES)[number], year);
					}}
					placeholder="الشهر"
					items={remainingBatches}
					labels={remainingBatches.map((b) => formatNum(+b))}
				/>
			</div>
			<div className="h-full">
				<InlineSelect
					value={`${year}`}
					onValueChange={(v: string) => {
						setYear(+v);
						start(month as (typeof BATCHES)[number], +v);
					}}
					placeholder="السنة"
					items={years}
					labels={years.map((y) => formatNum(+y))}
				/>
			</div>
		</div>
	);
}
