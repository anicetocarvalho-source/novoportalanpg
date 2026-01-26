import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowUpRight
} from "lucide-react";
import logoWhite from "@/assets/logo-white.webp";

const footerLinks = {
  institutional: [
    { name: "Sobre a ANPG", href: "/about" },
    { name: "Liderança", href: "/about/leadership" },
    { name: "Governança", href: "/about/governance" },
    { name: "História", href: "/about/history" },
  ],
  services: [
    { name: "Regulação", href: "/regulation" },
    { name: "Licenciamento", href: "/regulation/licensing" },
    { name: "Fiscalização", href: "/regulation/oversight" },
    { name: "Concursos", href: "/regulation/tenders" },
  ],
  investors: [
    { name: "Oportunidades", href: "/investment" },
    { name: "Blocos Disponíveis", href: "/investment/blocks" },
    { name: "Guia do Investidor", href: "/investment/guide" },
    { name: "Contactos", href: "/contact" },
  ],
  resources: [
    { name: "Dados de Energia", href: "/data" },
    { name: "Publicações", href: "/publications" },
    { name: "Notícias", href: "/news" },
    { name: "Carreiras", href: "/careers" },
  ],
};

export function Footer() {
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
                className="h-12 w-auto mb-6"
              />
            </Link>
            <p className="text-pearl/70 text-sm leading-relaxed mb-8 max-w-xs">
              Agência Nacional de Petróleo, Gás e Biocombustíveis de Angola. 
              Regulando o presente, construindo o futuro energético.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-pearl/70">
                  Rua Kwamme Nkrumah, Nº 6-8<br />
                  Ingombota, Luanda, Angola
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-pearl/70">+244 222 337 925</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-pearl/70">geral@anpg.co.ao</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="footer-heading text-primary-foreground">Institucional</h4>
            <ul className="space-y-3">
              {footerLinks.institutional.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">Investidores</h4>
            <ul className="space-y-3">
              {footerLinks.investors.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading text-primary-foreground">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">
                    {link.name}
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
              <span>© 2025 ANPG. Todos os direitos reservados.</span>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-pearl transition-colors">
                  Política de Privacidade
                </Link>
                <Link to="/terms" className="hover:text-pearl transition-colors">
                  Termos de Uso
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
