import {
  fireConfetti,
  formatNum,
  getPlurality,
  getTargetDate,
  startTimer,
} from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CLOCK_MODES, DAYS, HOURS, MONTHS, WEEKS } from "@/lib/constants";
import { useClockMode } from "@/hooks/use-clock-mode";
import { useAtomValue } from "jotai";
import { clockAtom } from "@/lib/atoms";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { useEffect } from "react";
import { differenceInDays } from "date-fns";
import type { Clock } from "@/lib/types";

export function Counter() {
  const { clockMode, setClockMode } = useClockMode();
  const { month } = useMonth();
  const { year } = useYear();

  const target = getTargetDate(month, year);

  useEffect(() => {
    if (!month || !year) return;

    startTimer(target);
  });

  useEffect(() => {
    if (!month || !year) return;

    const diff = differenceInDays(target, Date.now());

    let interval: NodeJS.Timeout;
    if (diff <= 31) interval = fireConfetti();

    return () => clearInterval(interval);
  }, [month, year, target]);

  return (
    <Tabs
      value={clockMode}
      onValueChange={(v: string) =>
        setClockMode(v as (typeof CLOCK_MODES)[number])
      }
    >
      <TabsList className="grid grid-cols-3 border-b border-border">
        <TabsTrigger value="weeks">اسابيع</TabsTrigger>
        <TabsTrigger value="days">ايام</TabsTrigger>
        <TabsTrigger value="months">شهور</TabsTrigger>
      </TabsList>
      <TabsContent value="days">
        <div
          className="grid grid-cols-2 [&>*]:not-last:border-l [&>*]:not-last:border-border border-b"
          dir="rtl"
        >
          <TimeSlot labels={DAYS} getValue={(clock) => clock?.totalDays} />
          <TimeSlot labels={HOURS} getValue={(clock) => clock?.hours} />
          {/* <TimeSlot
                  labels={MINUTES}
                  getValue={(clock) => clock?.minutes}
                /> */}
          {/* <TimeSlot
                  labels={SECONDS}
                  getValue={(clock) => clock?.seconds}
                /> */}
        </div>
      </TabsContent>
      <TabsContent value="months">
        <div
          className="grid grid-cols-3 [&>*]:not-last:border-l [&>*]:not-last:border-border border-b"
          dir="rtl"
        >
          <TimeSlot
            labels={MONTHS}
            getValue={(clock) =>
              clock ? clock.months + clock.years * 12 : undefined
            }
          />
          <TimeSlot labels={DAYS} getValue={(clock) => clock?.days} />
          <TimeSlot labels={HOURS} getValue={(clock) => clock?.hours} />
          {/* <TimeSlot
                  labels={MINUTES}
                  getValue={(clock) => clock?.minutes}
                /> */}
        </div>
      </TabsContent>
      <TabsContent value="weeks">
        <div
          className="grid grid-cols-3 [&>*]:not-last:border-l [&>*]:not-last:border-border border-b"
          dir="rtl"
        >
          <TimeSlot labels={WEEKS} getValue={(clock) => clock?.weeks} />
          <TimeSlot labels={DAYS} getValue={(clock) => clock?.weeksDays} />
          <TimeSlot labels={HOURS} getValue={(clock) => clock?.hours} />
          {/* <TimeSlot labels={MINUTES} value={clock?.minutes} /> */}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function TimeSlot({
  labels,
  getValue,
}: {
  labels: readonly string[];
  getValue: (clock?: Clock) => number | undefined;
}) {
  const clock = useAtomValue(clockAtom);
  const value = getValue(clock);

  return (
    <div className="flex flex-col items-center pt-7 pb-6 gap-1.5 [&>:first-child]:text-5xl">
      {value !== undefined ? (
        <>
          <p>{formatNum(value)}</p>
          <p>{labels.at(getPlurality(value))}</p>
        </>
      ) : (
        "-"
      )}
    </div>
  );
}
