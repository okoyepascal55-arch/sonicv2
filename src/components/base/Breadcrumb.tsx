
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-[#FAFDF5] backdrop-blur-sm border-b border-[#E7E4D4] py-3">
      <div className="max-w-7xl mx-auto px-6">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-foreground-400">
                  <i className="ri-arrow-right-s-line"></i>
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-foreground-700 hover:text-primary-500 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-foreground-950 font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
