interface TabsProps {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}

export default function Tab({ value, options, onChange }: TabsProps) {
  return (
    <div className="border-beige box-content flex h-11 w-full items-center justify-center gap-6 border-b-2">
      {options.map((opt) => {
        let active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-body text-navy box-content flex w-20 cursor-pointer items-center justify-center p-2.5 ${active ? "border-green border-b-4 font-bold" : "font-normal"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
