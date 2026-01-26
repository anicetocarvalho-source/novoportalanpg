import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "@/assets/logo-white.webp";
import logoRed from "@/assets/logo-red.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Sobre a ANPG", href: "/about" },
  { name: "Regulação & Licenciamento", href: "/regulation" },
  { name: "Investimentos", href: "/investment" },
  { name: "Dados de Energia", href: "/data" },
  { name: "Notícias", href: "/news" },
  { name: "Carreiras", href: "/careers" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.img
              src={isScrolled ? logoRed : logoWhite}
              alt="ANPG - Agência Nacional de Petróleo, Gás e Biocombustíveis"
              className="h-10 md:h-12 w-auto transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "nav-link link-underline",
                    isScrolled ? "nav-link-dark" : "nav-link-light"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant={isScrolled ? "hero" : "heroOutline"}
              size="default"
            >
              Portal do Investidor
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-sm transition-colors",
              isScrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button variant="hero" size="lg" className="mt-4">
                  Portal do Investidor
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
