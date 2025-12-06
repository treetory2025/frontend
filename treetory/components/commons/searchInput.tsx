import { Search } from "lucide-react";

interface searchData {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
  onKeyDown,
  onSubmit,
}: searchData) {
  return (
    <div className="relative flex w-full items-center justify-between gap-2 px-2">
      <Search
        size={24}
        className="text-muted-navy pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
      />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="text-body bg-muted-bg hover:border-green focus:border-green h-10 w-full rounded-md border border-transparent py-5 pl-10 focus:outline-none"
      />
      <button
        onClick={onSubmit}
        className="bg-green text-beige text-button h-10 w-20 rounded-md px-4 py-2"
      >
        검색
      </button>
    </div>
  );
}
