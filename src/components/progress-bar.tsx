import { useAddTraining } from "@/hooks/use-add-training";
import { useDuration } from "@/hooks/use-duration";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { formatNum, getRecruitmentDuration, getTargetDate } from "@/lib/utils";
import { TrainingCheckbox } from "./training-checkbox";

export function ProgressBar() {
  const { month } = useMonth();
  const { year } = useYear();
  const { duration } = useDuration();
  const { addTraining } = useAddTraining();

  const endDate = getTargetDate(month, year);

  const { passed, total, startDate } = getRecruitmentDuration(
    endDate,
    +duration,
    addTraining
  );

  const percentage = Math.round((passed / total) * 100);

  return (
    <div className="space-y-1 px-3 py-4">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl">
          {formatNum(passed >= 0 ? percentage : 0)} %
        </div>
        <div className="flex gap-1 items-baseline">
          <span className="text-xl">{formatNum(passed >= 0 ? passed : 0)}</span>
          <span className="text-muted-foreground">\ {formatNum(total)}</span>
          <span className="text-xs text-muted-foreground">يوم</span>
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className={`h-16 flex-1 rounded-none ${
              index < (percentage / 100) * 21 ? "bg-foreground" : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_2fr_1fr] items-center text-sm text-muted-foreground">
        <p>{startDate.toLocaleDateString("ar-EG")}</p>
        <div className="justify-self-center">
          <TrainingCheckbox />
        </div>

        <p className="justify-self-end">
          {new Date(endDate).toLocaleDateString("ar-EG")}
        </p>
      </div>
    </div>
  );
}
