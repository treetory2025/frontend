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
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center gap-1 rounded-lg px-4 py-3 transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-green text-beige'
              : 'bg-beige text-fg-primary hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">{category.icon}</span>
          <span className="whitespace-nowrap text-xs font-semibold md:text-sm">
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
