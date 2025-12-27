import { useDuration } from "@/hooks/use-duration";
import { DURATIONS, DURATIONS_LABELS } from "@/lib/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function Duration() {
	const { duration, setDuration } = useDuration();
	return (
		<div className="flex items-center h-full">
			{/* <p className="shrink-0 text-center border-l p-2 w-16 h-full">المدة</p> */}
			<Select
				value={duration}
				onValueChange={(v) => {
					setDuration(v as (typeof DURATIONS)[number]);
				}}
			>
				<SelectTrigger size="full">
					<SelectValue className="text-center text-base">
						{(value: string | null) => (
							<>
								{value
									? DURATIONS_LABELS[
											DURATIONS.indexOf(value as (typeof DURATIONS)[number])
										]
									: "المدة"}
							</>
						)}
					</SelectValue>
				</SelectTrigger>
				<SelectContent side="bottom">
					{DURATIONS.map((item, i) => (
						<SelectItem className="text-sm" key={item} value={item}>
							{DURATIONS_LABELS[i]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{/* <InlineSelect
				placeholder="المدة"
				items={DURATIONS}
				labels={DURATIONS_LABELS}
				value={duration}
				onValueChange={(v) => setDuration(v as (typeof DURATIONS)[number])}
			/> */}
		</div>
	);
}
