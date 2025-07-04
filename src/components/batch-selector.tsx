import { useMonth } from "@/hooks/use-month";
import { BATCHES } from "@/lib/constants";
import { useYear } from "@/hooks/use-year";
import { InlineSelect } from "./inline-select";
import { isPast } from "date-fns";
import { formatNum } from "@/lib/utils";
import { useMemo } from "react";

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
  return (
    <>
      <p className="py-2 px-3 border-l border-border text-lg text-foreground/80">
        دفعة
      </p>
      <p className="py-2 px-3 border-l border-border">1</p>
      <div className="border-l border-border h-full">
        <InlineSelect
          value={month}
          onValueChange={(v) => setMonth(v as (typeof BATCHES)[number])}
          placeholder="الدفعة"
          items={BATCHES}
          labels={BATCHES.map((b) => formatNum(+b))}
          disabled={(v) => isPast(`${v}-1-${year}`)}
        />
      </div>
      <div className="h-full">
        <InlineSelect
          value={`${year}`}
          onValueChange={(v: string) => setYear(+v)}
          placeholder="السنة"
          items={years}
          labels={years.map((y) => formatNum(+y))}
        />
      </div>
    </>
  );
}
