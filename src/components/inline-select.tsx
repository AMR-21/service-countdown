import { formatNum } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function InlineSelect({
	value,
	onValueChange,
	placeholder,
	items,
	labels,
}: {
	value: string | null;
	onValueChange: (value: string) => void;
	placeholder: string;
	items: readonly string[];
	labels?: readonly string[];
}) {
	return (
		<Select
			value={value}
			onValueChange={(v) => v && onValueChange(v)}
			disabled={!items.length}
		>
			<SelectTrigger size="full">
				<SelectValue className="text-ellipsis overflow-hidden whitespace-nowrap text-center text-lg">
					{(value: string | null) => (
						<>{value ? formatNum(+value) : placeholder}</>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{items.map((item, i) => (
					<SelectItem className="text-sm" key={item} value={item}>
						{labels?.at(i) || item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
