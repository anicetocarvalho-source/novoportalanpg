import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoWhite from "@/assets/logo-white.webp";
import logoRed from "@/assets/logo-red.webp";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  nameKey: string;
  href: string;
}

interface NavItem {
  nameKey: string;
  href: string;
  submenu?: SubMenuItem[];
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const { t } = useTranslation();

  const navigation: NavItem[] = [
    {
      nameKey: "nav.aboutUs",
      href: "/about",
      submenu: [
        { nameKey: "nav.submenu.anpg", href: "/about/anpg" },
        { nameKey: "nav.submenu.ourHistory", href: "/about/history" },
        { nameKey: "nav.submenu.socialResponsibility", href: "/about/social-responsibility" },
        { nameKey: "nav.submenu.contacts", href: "/contacts" },
      ],
    },
    {
      nameKey: "nav.opportunities",
      href: "/opportunities",
      submenu: [
        { nameKey: "nav.submenu.tender2025", href: "/opportunities/tender-2025" },
        { nameKey: "nav.submenu.permanentOffer", href: "/opportunities/permanent-offer" },
        { nameKey: "nav.submenu.tender2023", href: "/opportunities/tender-2023" },
      ],
    },
    {
      nameKey: "nav.epData",
      href: "/ep-data",
      submenu: [
        { nameKey: "nav.submenu.platformIona", href: "/ep-data/iona" },
        { nameKey: "nav.submenu.oasisImageBank", href: "/ep-data/oasis" },
        { nameKey: "nav.submenu.dataPackages", href: "/ep-data/packages" },
        { nameKey: "nav.submenu.epMaps", href: "/ep-data/maps" },
        { nameKey: "nav.submenu.conference2021", href: "/ep-data/conference-2021" },
        { nameKey: "nav.submenu.dataConference2023", href: "/ep-data/conference-2023" },
      ],
    },
    { nameKey: "nav.media", href: "/media" },
    { nameKey: "nav.production", href: "/production" },
    { nameKey: "nav.localContent", href: "/local-content" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (nameKey: string) => {
    setOpenDropdown(nameKey);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileSubmenu = (nameKey: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === nameKey ? null : nameKey);
  };

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
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.nameKey}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.nameKey)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                    isScrolled
                      ? "text-foreground hover:text-primary hover:bg-secondary"
                      : "text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10",
                    openDropdown === item.nameKey && (isScrolled ? "text-primary" : "text-primary")
                  )}
                >
                  {t(item.nameKey)}
                  {item.submenu && (
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        openDropdown === item.nameKey && "rotate-180"
                      )} 
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.submenu && openDropdown === item.nameKey && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 min-w-[240px] bg-background rounded-sm shadow-lg border border-border overflow-hidden"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.nameKey}
                          to={subItem.href}
                          className="block px-5 py-3 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors border-b border-border/50 last:border-b-0"
                        >
                          {t(subItem.nameKey)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right side: Language Toggle + CTA Button - Desktop */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageToggle isScrolled={isScrolled} />
            <Button
              variant={isScrolled ? "hero" : "heroOutline"}
              size="default"
            >
              {t("nav.investorPortal")}
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageToggle isScrolled={isScrolled} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-sm transition-colors",
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
          </div>
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
            className="lg:hidden bg-background border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <div key={item.nameKey}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleMobileSubmenu(item.nameKey)}
                          className="w-full flex items-center justify-between text-foreground font-medium py-3 hover:text-primary transition-colors"
                        >
                          {t(item.nameKey)}
                          <ChevronDown 
                            className={cn(
                              "w-5 h-5 transition-transform duration-200",
                              mobileOpenSubmenu === item.nameKey && "rotate-180"
                            )} 
                          />
                        </button>
                        <AnimatePresence>
                          {mobileOpenSubmenu === item.nameKey && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 border-l-2 border-primary/30 ml-2"
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.nameKey}
                                  to={subItem.href}
                                  className="block py-2.5 text-muted-foreground hover:text-primary transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {t(subItem.nameKey)}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="block text-foreground font-medium py-3 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t(item.nameKey)}
                      </Link>
                    )}
                  </div>
                ))}
                <Button variant="hero" size="lg" className="mt-4">
                  {t("nav.investorPortal")}
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
