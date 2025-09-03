import { useMonth } from "@/hooks/use-month";
import { BATCHES } from "@/lib/constants";
import { useYear } from "@/hooks/use-year";
import { InlineSelect } from "./inline-select";
import { isPast } from "date-fns";
import { formatNum, getTargetDate, startTimer } from "@/lib/utils";
import { useCallback, useMemo } from "react";

export function BatchSelector() {
  const { month, setMonth } = useMonth();
  const { year, setYear } = useYear();
  const years = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return year.toString();
      }),
    []
  );

  // useEffect(() => {
  //   if (!month || !year) return;

  //   const target = `${month}-1-${year}`;

  //   startTimer(target);
  // }, [month, year]);

  const start = useCallback(
    (month: (typeof BATCHES)[number] | null, year: number | null) => {
      const target = getTargetDate(month, year);

      startTimer(target);
    },
    []
  );

  return (
    <>
      <p className="py-2 px-3 border-l border-border text-lg text-foreground/80">
        دفعة
      </p>
      <p className="py-2 px-3 border-l border-border">{formatNum(1)}</p>
      <div className="border-l border-border h-full">
        <InlineSelect
          value={month}
          onValueChange={(v) => {
            setMonth(v as (typeof BATCHES)[number]);
            start(v as (typeof BATCHES)[number], year);
          }}
          placeholder="الدفعة"
          items={BATCHES}
          labels={BATCHES.map((b) => formatNum(+b))}
          disabled={(v) => isPast(`${v}-1-${year}`)}
        />
      </div>
      <div className="h-full">
        <InlineSelect
          value={`${year}`}
          onValueChange={(v: string) => {
            setYear(+v);
            start(month as (typeof BATCHES)[number], +v);
          }}
          placeholder="السنة"
          items={years}
          labels={years.map((y) => formatNum(+y))}
        />
      </div>
    </>
  );
}
