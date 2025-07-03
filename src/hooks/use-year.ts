import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

const storageKey = "year"

export function useYear() {

  const curYear = new Date().getFullYear()

  const [year, setYear] = useQueryState(
    storageKey,
    parseAsInteger.withDefault(curYear)

  )
  useEffect(() => {
    if (year && year < curYear) {
      setYear(null);
      localStorage.removeItem(storageKey);
      return;
    }

    const storedYear = Number(localStorage.getItem(storageKey));
    const isStoredValid = !isNaN(storedYear) && storedYear >= curYear;

    if (!year && isStoredValid) {
      setYear(storedYear);
      return;
    }

    if (year && (!isStoredValid || year !== storedYear)) {
      localStorage.setItem(storageKey, `${year}`);
    }
  }, [year, setYear, curYear]);


  return { year, setYear }
}