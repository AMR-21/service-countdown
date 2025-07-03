import { BatchSelector } from "./components/batch-selector";
import { Counter } from "./components/counter";
import { useEffect, useState } from "react";
import { fireConfetti, formatNum, getClock } from "./lib/utils";
import { useMonth } from "./hooks/use-month";
import { useYear } from "./hooks/use-year";
import { Footer } from "./components/footer";
import DiagonalPattern from "./components/diagonal-pattern";
import { Duration } from "./components/duration";
import { ProgressBar } from "./components/progress-bar";
import { useClockMode } from "./hooks/use-clock-mode";
import { differenceInDays } from "date-fns";
import type { Clock } from "./lib/types";

export default function App() {
  const { month } = useMonth();
  const { year } = useYear();
  const target = `${month}-1-${year}`;
  const [clock, setClock] = useState<Clock | undefined>();
  const { clockMode } = useClockMode();

  useEffect(() => {
    if (!month || !year) return;

    if (!clock) setClock(getClock(target));

    const interval = setInterval(() => {
      setClock(getClock(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [clock, month, year, target]);

  useEffect(() => {
    if (!month || !year) return;

    const diff = differenceInDays(target, Date.now());

    let interval: NodeJS.Timeout;
    if (diff <= 31) interval = fireConfetti();

    return () => clearInterval(interval);
  }, [month, year, target]);

  return (
    <div className="mx-auto h-screen bg-background container flex flex-col max-w-2xl sm:border-x">
      {/* Header */}
      <div className="border-b border-border grid text-xl grid-cols-[1fr_0.75fr_0.75fr_1fr] text-center items-center">
        <BatchSelector />
      </div>

      <h1 className="px-8 pt-4 pb-8 text-center font-ruqaa text-6xl border-b border-border">
        عَدَّادُ المِيرِي
      </h1>

      {/* Scroll */}
      {!month || !year ? (
        <div className="grow">اختار الدفعة اعلاه لبدا العد</div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="border-b border-border">
            <Counter clock={clock} />
          </div>

          <div className="border-b border-border relative">
            <DiagonalPattern>
              {clockMode !== "days" && (
                <div className="flex h-full bg-background text-lg justify-center items-center aspect-square border-l border-r mx-auto">
                  {formatNum(clock?.seconds || 0)}
                </div>
              )}
            </DiagonalPattern>
          </div>

          <div className=" border-border grow flex flex-col gap-8 pb-8">
            <Duration />

            <ProgressBar />
          </div>
        </div>
      )}
      {/* Scroll */}

      {/* Footer */}
      <div className="border-t border-border">
        <Footer />
      </div>
    </div>
  );
}
