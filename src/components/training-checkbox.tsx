import { useAddTraining } from "@/hooks/use-add-training";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export function TrainingCheckbox() {
	const { addTraining, setAddTraining } = useAddTraining();

	return (
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
	);
}
