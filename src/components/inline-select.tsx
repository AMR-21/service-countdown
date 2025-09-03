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
  disabled,
}: {
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: readonly string[];
  labels?: readonly string[];
  disabled?: (v: string) => boolean;
}) {
  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue
          className="text-ellipsis overflow-hidden whitespace-nowrap"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        {items.map((item, i) => (
          <SelectItem
            disabled={disabled?.(item) || false}
            key={item}
            value={item}
          >
            {labels?.at(i) || item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
