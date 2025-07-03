import { CLOCK_MODES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";

const storageKey = "clockMode"

export function useClockMode() {
  const [clockMode, setClockMode] = useQueryState(storageKey, parseAsStringLiteral(CLOCK_MODES).withDefault("days"))

  useEffect(() => {
    if (!clockMode) {
      localStorage.removeItem(storageKey);
      return;
    }

    const storedClockMode = localStorage.getItem(storageKey);
    const isStoredValid = CLOCK_MODES.includes(storedClockMode as typeof CLOCK_MODES[number]);

    if (!clockMode && isStoredValid) {
      setClockMode(storedClockMode as typeof CLOCK_MODES[number]);
      return;
    }

    if (clockMode && (!isStoredValid || clockMode !== storedClockMode)) {
      localStorage.setItem(storageKey, clockMode);
    }
  }, [clockMode, setClockMode]);


  return { clockMode, setClockMode }
}