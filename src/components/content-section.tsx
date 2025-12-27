import { IconArrowUp } from "@tabler/icons-react";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { Clock } from "./clock";
import { Counter } from "./counter";
import DiagonalPattern from "./diagonal-pattern";
import { Duration } from "./duration";
import { ProgressBar } from "./progress-bar";
import { TrainingCheckbox } from "./training-checkbox";

export function ContentSection() {
	const { month } = useMonth();
	const { year } = useYear();
	return (
		<>
			{!month || !year ? (
				<div className="grow flex items-center justify-center text-3xl flex-col gap-3 h-full">
					<IconArrowUp />
					<span>اختار الدفعة أعلاه لبدأ العد</span>
				</div>
			) : (
				<>
					<div className="flex w-full">
						<div className="flex-1 border-l">
							<Counter />
						</div>
						<div className="w-12 border-b">
							<Clock />
						</div>
					</div>
					<DiagonalPattern />
					<div className="flex border-y p-0 h-11">
						<div className="flex-1 border-l">
							<Duration />
						</div>
						<TrainingCheckbox />
					</div>
					<div className=" border-border grow flex flex-col gap-8 pb-8">
						<ProgressBar />
					</div>
				</>
			)}
		</>
	);
}
