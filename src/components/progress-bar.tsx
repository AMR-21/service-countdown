import { useAddTraining } from "@/hooks/use-add-training";
import { useDuration } from "@/hooks/use-duration";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { formatNum, getRecruitmentDuration } from "@/lib/utils";

export function ProgressBar() {
  const { month } = useMonth();
  const { year } = useYear();
  const { duration } = useDuration();
  const { addTraining } = useAddTraining();

  const endDate = `${month}-1-${year}`;

  const { passed, total } = getRecruitmentDuration(
    endDate,
    +duration,
    addTraining
  );

  const percentage = Math.round((passed / total) * 100);

  return (
    <div className="grow space-y-1 px-3">
      <div className="flex items-baseline justify-between">
        <div className="text-3xl">
          {formatNum(passed >= 0 ? percentage : 0)} %
        </div>
        <div className="flex gap-1 items-baseline">
          <span className="text-2xl">
            {formatNum(passed >= 0 ? passed : 0)}
          </span>
          <span className="text-muted-foreground text-lg">
            \ {formatNum(total)}
          </span>
          <span className="text-sm text-muted-foreground">يوم</span>
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 21 }, (_, index) => (
          <div
            key={index}
            className={`h-20 flex-1 rounded-none ${
              index < (percentage / 100) * 21 ? "bg-foreground" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
