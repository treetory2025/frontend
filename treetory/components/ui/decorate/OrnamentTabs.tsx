interface Category {
  id: string;
  label: string;
  // icon can be a text (emoji) or a path to an image in public/
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
    <div className="mb-6 flex items-center justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={`flex size-12 items-center justify-center overflow-hidden rounded-full text-2xl transition-all md:size-14 ${
              selectedCategory === category.id
                ? "border-green bg-navy border-3"
                : "bg-beige"
            }`}
          >
            {category.icon && (
              <img
                src={category.icon}
                alt={category.label}
                className="size-8 rounded-full object-contain"
                crossOrigin="anonymous"
              />
            )}
          </div>
          <span className="text-fg-primary text-center text-xs font-semibold">
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
