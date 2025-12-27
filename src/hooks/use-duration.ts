import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import { DURATIONS } from "@/lib/constants";

const storageKey = "duration";

export function useDuration() {
	const [duration, setDuration] = useQueryState(
		storageKey,
		parseAsStringLiteral(DURATIONS).withDefault("1"),
	);
	useEffect(() => {
		if (!duration) {
			setDuration(null);
			localStorage.removeItem(storageKey);
			return;
		}

		const storedDuration = localStorage.getItem(storageKey);
		const isStoredValid = DURATIONS.includes(
			storedDuration as (typeof DURATIONS)[number],
		);

		if (!duration && isStoredValid) {
			setDuration(storedDuration as (typeof DURATIONS)[number]);
			return;
		}

		if (duration && (!isStoredValid || duration !== storedDuration)) {
			localStorage.setItem(storageKey, duration);
		}
	}, [duration, setDuration]);

	return { duration, setDuration };
}
