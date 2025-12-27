import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import { verifyYear } from "@/lib/utils";

const storageKey = "year";

export function useYear() {
	const curYear = new Date().getFullYear();

	const [year, setYear] = useQueryState(
		storageKey,
		parseAsInteger.withDefault(verifyYear(curYear) ? curYear : curYear + 1),
	);

	useEffect(() => {
		if (!verifyYear(year)) {
			setYear(null);
			localStorage.removeItem(storageKey);
			return;
		}

		const storedYear = Number(localStorage.getItem(storageKey));
		const isStoredValid = !Number.isNaN(storedYear) && verifyYear(storedYear);

		if (!year && isStoredValid) {
			setYear(storedYear);
			return;
		}

		if (year && (!isStoredValid || year !== storedYear)) {
			localStorage.setItem(storageKey, `${year}`);
		}
	}, [year, setYear]);

	return { year, setYear };
}
