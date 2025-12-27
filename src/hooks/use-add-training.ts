import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";

const storageKey = "addTraining";

export function useAddTraining() {
	const [addTraining, setAddTraining] = useQueryState(
		storageKey,
		parseAsBoolean.withDefault(true),
	);
	useEffect(() => {
		if (addTraining === null) {
			localStorage.removeItem(storageKey);
			return;
		}

		const storedValue = localStorage.getItem(storageKey);
		const isStoredValid = storedValue === "true" || storedValue === "false";

		if (addTraining === null && isStoredValid) {
			setAddTraining(storedValue === "true");
			return;
		}

		if (
			addTraining !== null &&
			(!isStoredValid || addTraining !== (storedValue === "true"))
		) {
			localStorage.setItem(storageKey, addTraining ? "true" : "false");
		}
	}, [addTraining, setAddTraining]);

	return { addTraining, setAddTraining };
}
