import { isPast } from "date-fns";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import { BATCHES } from "@/lib/constants";
import { useYear } from "./use-year";

const storageKey = "month";

export function useMonth() {
	const [month, setMonth] = useQueryState(
		storageKey,
		parseAsStringLiteral(BATCHES),
	);

	const { year } = useYear();
	useEffect(() => {
		const storedMonth = localStorage.getItem(storageKey);
		const isStoredValid = BATCHES.includes(
			storedMonth as (typeof BATCHES)[number],
		);

		if ((!month && !isStoredValid) || (month && isPast(`${month}-1-${year}`))) {
			setMonth(null);
			localStorage.removeItem(storageKey);
			return;
		}

		if (!month && isStoredValid) {
			setMonth(storedMonth as (typeof BATCHES)[number]);
			return;
		}

		if (month && (!isStoredValid || month !== storedMonth)) {
			localStorage.setItem(storageKey, month);
		}
	}, [month, setMonth, year]);

	return { month, setMonth };
}
