import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Youtube
} from "lucide-react";
import logoWhite from "@/assets/logo-white.webp";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    institutional: [
      { nameKey: "footer.links.about", href: "/about" },
      { nameKey: "footer.links.anpg", href: "/about/anpg" },
      { nameKey: "footer.links.socialResponsibility", href: "/about/social-responsibility" },
      { nameKey: "footer.links.history", href: "/about/history" },
    ],
    services: [
      { nameKey: "footer.links.regulation", href: "/regulation" },
      { nameKey: "footer.links.licensing", href: "/regulation/licensing" },
      { nameKey: "footer.links.oversight", href: "/regulation/oversight" },
      { nameKey: "footer.links.tenders", href: "/regulation/tenders" },
    ],
    investors: [
      { nameKey: "footer.links.opportunities", href: "/opportunities" },
      { nameKey: "footer.links.investorPortal", href: "/investor-portal" },
      { nameKey: "footer.links.availableBlocks", href: "/ep-data/maps" },
      { nameKey: "footer.links.faq", href: "/faq" },
      { nameKey: "footer.links.contact", href: "/contacts" },
    ],
    resources: [
      { nameKey: "footer.links.energyData", href: "/ep-data" },
      { nameKey: "footer.links.production", href: "/production" },
      { nameKey: "footer.links.news", href: "/media" },
      { nameKey: "footer.links.localContent", href: "/local-content" },
    ],
  };

  return (
    <footer className="bg-foreground text-pearl">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img
                src={logoWhite}
                alt="ANPG"
                className="h-24 w-auto mb-6"
              />
            </Link>
            <p className="text-pearl/70 text-sm leading-relaxed mb-8 max-w-xs">
              {t("footer.description")}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-pearl/70">
                  Edifício Torres do Carmo - Torre 2<br />
                  Av. de Portugal, Rua Lopes de Lima<br />
                  Município de Luanda, Angola
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-pearl/70">+244 226 428 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-pearl/70">info@anpg.co.ao</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="footer-heading text-primary-foreground">{t("footer.institutional")}</h4>
            <ul className="space-y-3">
              {footerLinks.institutional.map((link) => (
                <li key={link.nameKey}>
                  <Link to={link.href} className="footer-link">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.nameKey}>
                  <Link to={link.href} className="footer-link">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">{t("footer.investors")}</h4>
            <ul className="space-y-3">
              {footerLinks.investors.map((link) => (
                <li key={link.nameKey}>
                  <Link to={link.href} className="footer-link">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.nameKey}>
                  <Link to={link.href} className="footer-link">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pearl/10">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-pearl/50">
              <span>{t("footer.copyright")}</span>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-pearl transition-colors">
                  {t("footer.privacy")}
                </Link>
                <Link to="/terms" className="hover:text-pearl transition-colors">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl/50 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl/50 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl/50 hover:text-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
