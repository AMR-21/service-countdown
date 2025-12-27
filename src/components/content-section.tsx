import { ArrowUp } from "lucide-react";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { Clock } from "./clock";
import { Counter } from "./counter";
import DiagonalPattern from "./diagonal-pattern";
import { Duration } from "./duration";
import { ProgressBar } from "./progress-bar";

export function ContentSection() {
	const { month } = useMonth();
	const { year } = useYear();
	return (
		<>
			{!month || !year ? (
				<div className="grow flex items-center justify-center text-3xl flex-col gap-3 h-full">
					<ArrowUp />
					<span>اختار الدفعة أعلاه لبدأ العد</span>
				</div>
			) : (
				<>
					<Counter />
					<DiagonalPattern>
						<div className="grid-cols-3 grid *:not-last:border-l *:not-last:border-border border-b">
							<div className="bg-background col-span-2">
								<Duration />
							</div>
							<div>
								<Clock />
							</div>
						</div>
					</DiagonalPattern>
					<div className=" border-border grow flex flex-col gap-8 pb-8">
						<ProgressBar />
					</div>
				</>
			)}
		</>
	);
}
