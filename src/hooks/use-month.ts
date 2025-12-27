import { isPast } from "date-fns";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import { BATCHES } from "@/lib/constants";
import { getRemainingBatches } from "@/lib/utils";
import { useYear } from "./use-year";

const storageKey = "month";

export function useMonth() {
	const [month, setMonth] = useQueryState(
		storageKey,
		parseAsStringLiteral(BATCHES),
	);

	const { year } = useYear();

	const remainingBatches = getRemainingBatches(year);

	useEffect(() => {
		const storedMonth = localStorage.getItem(storageKey);
		const isStoredValid =
			BATCHES.includes(storedMonth as (typeof BATCHES)[number]) &&
			remainingBatches.includes(storedMonth as (typeof BATCHES)[number]);

		if (
			(!month && !isStoredValid) ||
			(month && isPast(`${month}-25-${year}`))
		) {
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
	}, [month, setMonth, year, remainingBatches]);

	return { month, setMonth };
}
