interface Category {
  id: string;
  label: string;
  icon: string;
}

interface OrnamentTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function OrnamentTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: OrnamentTabsProps) {
  return (
    <div className="mb-6 flex gap-4 justify-center items-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              selectedCategory === category.id
                ? 'border-3 border-green bg-navy'
                : 'bg-beige'
            }`}
          >
            {category.icon}
          </div>
          <span className="text-xs font-semibold text-fg-primary text-center">
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
