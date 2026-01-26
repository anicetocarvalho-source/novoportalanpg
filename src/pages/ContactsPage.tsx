import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.contacts.title"
      subtitleKey="pages.contacts.subtitle"
      descriptionKey="pages.contacts.description"
      icon={<Phone className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.submenu.contacts" },
      ]}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Sede</h3>
              <p className="text-muted-foreground">
                Rua Comandante Gika, nº 118/122<br />
                Luanda, Angola
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
              <p className="text-muted-foreground">+244 222 337 116</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground">info@anpg.co.ao</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Horário</h3>
              <p className="text-muted-foreground">
                Segunda a Sexta: 08:00 - 17:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
          <h3 className="text-xl font-bold text-foreground mb-6">Enviar Mensagem</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                placeholder="O seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                placeholder="O seu email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="A sua mensagem"
              />
            </div>
            <Button variant="hero" size="lg" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
