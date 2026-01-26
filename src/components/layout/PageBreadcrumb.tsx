import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  labelKey?: string;
  label?: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-secondary/50 border-b border-border"
      aria-label="Breadcrumb"
    >
      <div className="container mx-auto px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const displayLabel = item.label || (item.labelKey ? t(item.labelKey) : '');
            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                {item.href && index !== items.length - 1 ? (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {displayLabel}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {displayLabel}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}
