import { DURATIONS, DURATIONS_LABELS } from "@/lib/constants";
import { InlineSelect } from "./inline-select";
import { useDuration } from "@/hooks/use-duration";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useAddTraining } from "@/hooks/use-add-training";

export function Duration() {
  const { duration, setDuration } = useDuration();
  const { addTraining, setAddTraining } = useAddTraining();
  return (
    <div className="grid grid-cols-2 border-b border-border text-sm">
      <div className="border-border border-l flex items-center ">
        <p className="shrink-0 px-2 py-2 border-l">المدة</p>
        <InlineSelect
          placeholder="المدة"
          items={DURATIONS}
          labels={DURATIONS_LABELS}
          value={duration}
          onValueChange={(v) => setDuration(v as (typeof DURATIONS)[number])}
        />
      </div>
      <div className="flex items-center h-full  hover:bg-input/50">
        <Label className="px-3 py-2 w-full">
          <span>احتساب مدة التدريب</span>
          <Checkbox
            checked={addTraining}
            onCheckedChange={(v) =>
              v ? setAddTraining(true) : setAddTraining(false)
            }
          />
        </Label>
      </div>
    </div>
  );
}
