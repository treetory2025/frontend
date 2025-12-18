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
            className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-2xl transition-all ${
              selectedCategory === category.id
                ? "border-green bg-navy border-3"
                : "bg-beige"
            }`}
          >
            {category.icon &&
            (category.icon.endsWith(".png") ||
              category.icon.endsWith(".jpg") ||
              category.icon.endsWith(".jpeg")) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={category.icon}
                alt={category.label}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <span>{category.icon}</span>
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
