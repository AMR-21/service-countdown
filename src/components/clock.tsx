import { clockAtom } from "@/lib/atoms";
import { cn, formatNum } from "@/lib/utils";
import { useAtomValue } from "jotai";

export function Clock() {
  const clock = useAtomValue(clockAtom);

  return (
    <div
      className={cn(
        "text-center grid grid-cols-3 items-center justify-center h-full"
      )}
    >
      <div className="bg-background h-full flex items-center justify-center">
        <p className="text-lg md:text-2xl">
          {clock ? formatNum(clock?.minutes) : "-"}
        </p>
      </div>
      <p className="text-lg md:text-xl border-x h-full flex items-center justify-center">
        :
      </p>
      <div className="bg-background h-full flex items-center justify-center">
        <p className="text-lg md:text-2xl">
          {clock ? formatNum(clock?.seconds) : "-"}
        </p>
      </div>
    </div>
  );
}
