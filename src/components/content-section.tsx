import { IconArrowUp } from "@tabler/icons-react";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { BgPattern } from "./bg-pattern";
import { Clock } from "./clock";
import { Counter } from "./counter";
import DiagonalPattern from "./diagonal-pattern";
import { Duration } from "./duration";
import { Footer } from "./footer";
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
					<div className="border-y p-0 flex flex-col py-4">
						<div className=" border-border grow flex flex-col gap-8 ">
							<ProgressBar />
						</div>
						<div className="mx-auto">
							<TrainingCheckbox />
						</div>
					</div>
					<div className="relative overflow-hidden flex-1 h-full">
						<BgPattern />
					</div>
				</>
			)}
		</>
	);
}
