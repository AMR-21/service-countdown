import {
  differenceInDays,
  intervalToDuration,
  isWithinInterval,
} from "date-fns";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import confetti from "canvas-confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import { useLocalStorage } from "usehooks-ts";

type CounterState = {
  mode?: "days" | "weeks" | "months";
  batchMonth?: string;
  batchYear?: string;
};

interface Duration {
  weeks: number;
  weeksDays: number;
  totalDays: number;
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
const target = new Date("3-1-2026");

const endTraining = {
  start: new Date("3-11-2025"),
  end: new Date("3-14-2025"),
};

const endService = {
  start: new Date("2-25-2026"),
  end: new Date("3-1-2026"),
};

function formatNum(num: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "decimal",
    useGrouping: false,
  }).format(num);
}

function getDuration() {
  const now = Date.now();
  const totalDays = differenceInDays(target, now);
  const weeks = Math.floor(totalDays / 7);
  const weeksDays = totalDays % 7;

  return {
    ...intervalToDuration({
      end: target.valueOf(),
      start: now,
    }),
    weeks,
    weeksDays,
    totalDays,
  };
}

function render(
  inputs: {
    label: string;
    value: number;
  }[],
  isDaysOnly?: boolean
) {
  return (
    <div className="">
      <div className="md:hidden flex flex-col items-center sm:flex-row md:items-end gap-y-1.5 md:gap-x-8 px-4 py-2.5 rounded-lg backdrop-blur-2xl bg-border/10 w-full">
        <div className="flex" dir="rtl">
          {inputs.slice(0, isDaysOnly ? 1 : 2).map((t, i, arr) => (
            <Fragment key={t.label}>
              <div className="flex flex-col items-center space-y-2 w-12">
                <p className="md:text-xl">{t.label}</p>
                <p className="text-4xl md:text-5xl font-medium tabular-nums">
                  {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
                </p>
              </div>

              {i !== arr.length - 1 && (
                <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                  :
                </p>
              )}
            </Fragment>
          ))}
        </div>

        <div className="flex" dir="rtl">
          {inputs.slice(isDaysOnly ? 1 : 2).map((t, i, arr) => (
            <Fragment key={t.label}>
              <div className="flex flex-col items-center space-y-2 w-12">
                <p className="md:text-xl">{t.label}</p>
                <p className="text-4xl md:text-5xl font-medium tabular-nums">
                  {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
                </p>
              </div>

              {i !== arr.length - 1 && (
                <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                  :
                </p>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div
        className="md:flex flex-col items-center sm:flex-row md:items-end w-fit gap-y-1.5 md:gap-x-8 px-4 md:px-8 py-2.5 rounded-lg backdrop-blur-2xl bg-border/10 hidden"
        dir="rtl"
      >
        {inputs.map((t, i, arr) => (
          <Fragment key={t.label}>
            <div className="flex flex-col items-center space-y-2 w-12">
              <p className="md:text-xl">{t.label}</p>
              <p className="text-4xl md:text-5xl font-medium tabular-nums">
                {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
              </p>
            </div>

            {i !== arr.length - 1 && (
              <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                :
              </p>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  const [remaining, setRemaining] = useState<Duration | null>();
  const [isCelebrating] = useState(
    isWithinInterval(Date.now(), {
      ...endTraining,
    }) ||
      isWithinInterval(Date.now(), {
        ...endService,
      })
  );

  useEffect(() => {
    if (!remaining) setRemaining(getDuration());
    const interval = setInterval(() => {
      setRemaining(getDuration());
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  useEffect(() => {
    if (!isCelebrating) return;
    const duration = 20 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isCelebrating]);

  return (
    <div className="max-h-dvh h-dvh bg-border p-8 flex flex-col items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-gray-200">
      <div className="flex flex-col items-center space-y-4">
        {/* Title */}
        <h1 className="text-6xl font-bold">يارب</h1>

        {/* Days Counter */}
        <div className="flex items-center gap-2 md:flex-col-reverse">
          <div>
            <div className="flex items-center gap-2">
              <p className="md:text-3xl text-xl">
                {formatNum(differenceInDays(new Date(), new Date("1-1-2025")))}
              </p>
              {/* <Image
                src={"/check.svg"}
                alt="check"
                width={16}
                height={16}
                className="size-4 md:size-8"
              /> */}
            </div>
          </div>
          <span className="md:hidden">&mdash;</span>

          <p className="text-xl">
            دفعة {formatNum(1)} / {formatNum(3)} / {String(formatNum(2026))}
          </p>
        </div>
      </div>

      {/* Timer */}
      <Tabs
        defaultValue="months"
        className="flex-grow  items-center flex flex-col  my-12 "
      >
        <TabsList className="" dir="rtl">
          <TabsTrigger value="weeks">اسابيع</TabsTrigger>
          <TabsTrigger value="months">شهور</TabsTrigger>
          <TabsTrigger value="days">ايام</TabsTrigger>
        </TabsList>

        <div className="flex w-full mt-4 h-1/2 items-center">
          <TabsContent value="weeks">
            {render([
              { label: "اسابيع", value: remaining?.weeks || 0 },
              { label: "ايام", value: remaining?.weeksDays || 0 },
              { label: "ساعات", value: remaining?.hours || 0 },
              { label: "دقايق", value: remaining?.minutes || 0 },
              { label: "ثواني", value: remaining?.seconds || 0 },
            ])}
          </TabsContent>
          <TabsContent value="months">
            {render([
              { label: "شهور", value: remaining?.months || 0 },
              { label: "ايام", value: remaining?.days || 0 },
              { label: "ساعات", value: remaining?.hours || 0 },
              { label: "دقايق", value: remaining?.minutes || 0 },
              { label: "ثواني", value: remaining?.seconds || 0 },
            ])}
          </TabsContent>

          <TabsContent value="days">
            {render(
              [
                { label: "ايام", value: remaining?.totalDays || 0 },
                { label: "ساعات", value: remaining?.hours || 0 },
                { label: "دقايق", value: remaining?.minutes || 0 },
                { label: "ثواني", value: remaining?.seconds || 0 },
              ],
              true
            )}
          </TabsContent>
        </div>
      </Tabs>

      <footer className="mt-auto text-center">
        <p>
          {" "}
          نهاية التدريب {`${formatNum(11)}-${formatNum(3)}`} &mdash;{" "}
          {`${formatNum(14)}-${formatNum(3)}`}
        </p>
        <p className="md:text-xl font-medium text-gray-400">
          عمرو - المحلاوي - عاصم - وليد
          <br />
          عبدالوهاب - بلال
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  const [counterState, setCounterState] = useLocalStorage<CounterState | null>(
    "counter-state",
    null
  );

  const [batchMonth, setBatchMonth] = useState(counterState?.batchMonth || "1");
  const [batchYear, setBatchYear] = useState(counterState?.batchYear || "2025");
  const [mode, setMode] = useState(counterState?.mode || "days");

  const handleBatchMonthChange = useCallback(
    (value: string) => {
      setBatchMonth(value);
      setCounterState({ ...counterState, batchMonth: value } as CounterState);
    },
    [counterState, setCounterState]
  );

  const handleBatchYearChange = useCallback(
    (value: string) => {
      setBatchYear(value);
      setCounterState({ ...counterState, batchYear: value } as CounterState);
    },
    [counterState, setCounterState]
  );

  const handleModeChange = useCallback(
    (value: string) => {
      setMode(value as "days" | "weeks" | "months");
      setCounterState({
        ...counterState,
        mode: value as "days" | "weeks" | "months",
      } as CounterState);
    },
    [counterState, setCounterState]
  );

  return (
    <div className=" mx-auto h-full bg-background container flex flex-col max-w-2xl">
      <BatchSelector
        month={batchMonth}
        year={batchYear}
        onMonthChange={handleBatchMonthChange}
        onYearChange={handleBatchYearChange}
      />

      <p className="px-8 pt-4 pb-8 text-center font-ruqaa text-6xl border-b border-border">
        عَدَّادُ المِيرِي
      </p>

      <div className="border-b border-border">
        <Tabs defaultValue={mode} onValueChange={handleModeChange}>
          <TabsList className="grid grid-cols-3 border-b border-border">
            <TabsTrigger value="days">ايام</TabsTrigger>
            <TabsTrigger value="weeks">اسابيع</TabsTrigger>
            <TabsTrigger value="months">شهور</TabsTrigger>
          </TabsList>

          <TabsContent value="days">
            <div className="grid grid-cols-3" dir="rtl">
              <div className="flex flex-col items-center pt-5 pb-3 gap-1.5 border-l border-border">
                <p className="text-5xl">1022</p>
                <p className="">يوم</p>
              </div>
              <div className="flex flex-col items-center pt-5 pb-3 gap-1.5 border-l border-border">
                <p className="text-5xl">10</p>
                <p className="">ساعات</p>
              </div>
              <div className="flex flex-col items-center pt-5 pb-3 gap-1.5 border-l border-border">
                <p className="text-5xl">50</p>
                <p className="">دقيقة</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="p-2 border-b border-border grow flex items-center justify-center">
        <div className="bg-red-500 size-68"></div>
      </div>
      <div className="p-2">github+theme+confetti+minutes/seconds</div>
    </div>
  );
}

function BatchSelector({
  month,
  year,
  onMonthChange,
  onYearChange,
}: {
  month: string;
  year: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}) {
  return (
    <div className="border-b border-border grid text-xl grid-cols-[1fr_0.5fr_0.75fr_1fr] text-center items-center">
      <p className="py-2 px-3 border-l border-border text-lg text-foreground/80">
        دفعة
      </p>
      <p className="py-2 px-3 border-l border-border">1</p>
      <div className="border-l border-border">
        <Selector
          defaultValue={month}
          onValueChange={onMonthChange}
          placeholder="الدفعة"
          items={["2", "3", "5", "6", "8", "9", "11", "12"]}
        />
      </div>
      <div>
        <Selector
          defaultValue={year}
          onValueChange={onYearChange}
          placeholder="السنة"
          items={Array.from({ length: 11 }, (_, i) => {
            const year = new Date().getFullYear() + i;
            return year.toString();
          })}
        />
      </div>
    </div>
  );
}

function Selector({
  defaultValue,
  onValueChange,
  placeholder,
  items,
}: {
  defaultValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: string[];
}) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
