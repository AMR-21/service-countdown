import { useDuration } from "@/hooks/use-duration";
import { DURATIONS, DURATIONS_LABELS } from "@/lib/constants";
import { InlineSelect } from "./inline-select";

export function Duration() {
	const { duration, setDuration } = useDuration();
	return (
		<div className="flex items-center ">
			<p className="shrink-0 px-2 py-2 border-l">المدة</p>
			<InlineSelect
				placeholder="المدة"
				items={DURATIONS}
				labels={DURATIONS_LABELS}
				value={duration}
				onValueChange={(v) => setDuration(v as (typeof DURATIONS)[number])}
			/>
		</div>
	);
}
