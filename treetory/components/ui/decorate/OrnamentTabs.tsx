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
    <div className="mb-6 flex gap-4 justify-center items-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl overflow-hidden transition-all ${
              selectedCategory === category.id
                ? 'border-3 border-green bg-navy'
                : 'bg-beige'
            }`}
          >
            {category.icon && (category.icon.endsWith('.png') || category.icon.endsWith('.jpg') || category.icon.endsWith('.jpeg')) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={category.icon} alt={category.label} className="w-10 h-10 object-contain" />
            ) : (
              <span>{category.icon}</span>
            )}
          </div>
          <span className="text-xs font-semibold text-fg-primary text-center">
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
