import { formatNum, getPlurality } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CLOCK_MODES,
  DAYS,
  HOURS,
  MINUTES,
  MONTHS,
  SECONDS,
  WEEKS,
} from "@/lib/constants";
import type { Clock } from "@/lib/types";
import { useClockMode } from "@/hooks/use-clock-mode";

export function Counter({ clock }: { clock: Clock | undefined }) {
  const { clockMode, setClockMode } = useClockMode();

  if (!clock) return null;

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
          className="grid grid-cols-2 [&>*]:odd:border-l [&>*]:odd:border-border [&>*]:nth-[-n+2]:border-b"
          dir="rtl"
        >
          <TimeSlot labels={DAYS} value={clock.totalDays} />
          <TimeSlot labels={HOURS} value={clock.hours} />
          <TimeSlot labels={MINUTES} value={clock.minutes} />
          <TimeSlot labels={SECONDS} value={clock.seconds} />
        </div>
      </TabsContent>
      <TabsContent value="months">
        <div
          className="grid grid-cols-2 [&>*]:odd:border-l [&>*]:odd:border-border [&>*]:nth-[-n+2]:border-b"
          dir="rtl"
        >
          <TimeSlot labels={MONTHS} value={clock.months + clock.years * 12} />
          <TimeSlot labels={DAYS} value={clock.days} />
          <TimeSlot labels={HOURS} value={clock.hours} />
          <TimeSlot labels={MINUTES} value={clock.minutes} />
        </div>
      </TabsContent>
      <TabsContent value="weeks">
        <div
          className="grid grid-cols-2 [&>*]:odd:border-l [&>*]:odd:border-border [&>*]:nth-[-n+2]:border-b"
          dir="rtl"
        >
          <TimeSlot labels={WEEKS} value={clock.weeks} />
          <TimeSlot labels={DAYS} value={clock.weeksDays} />
          <TimeSlot labels={HOURS} value={clock.hours} />
          <TimeSlot labels={MINUTES} value={clock.minutes} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

function TimeSlot({
  labels,
  value,
}: {
  value: number;
  labels: readonly string[];
}) {
  return (
    <div className="flex flex-col items-center pt-7 pb-6 gap-1.5 [&>:first-child]:text-5xl">
      <p>{formatNum(value)}</p>
      <p>{labels.at(getPlurality(value))}</p>
    </div>
  );
}
