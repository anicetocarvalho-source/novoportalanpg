import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

const ANPG_ADDRESS = "Edifício Torres do Carmo, Torre 2, Avenida de Portugal, Luanda, Angola";

export default function ContactsPage() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: "pages.contacts.info.address.title",
      content: (
        <>
          Edifício Torres do Carmo - Torre 2<br />
          Avenida de Portugal, Rua Lopes de Lima<br />
          Município de Luanda, Angola
        </>
      ),
    },
    {
      icon: Phone,
      titleKey: "pages.contacts.info.phone.title",
      content: "+244 226 428 000",
    },
    {
      icon: Mail,
      titleKey: "pages.contacts.info.email.title",
      content: "info@anpg.co.ao",
    },
    {
      icon: Clock,
      titleKey: "pages.contacts.info.hours.title",
      contentKey: "pages.contacts.info.hours.content",
    },
  ];

  return (
    <PageLayout
      titleKey="pages.contacts.title"
      subtitleKey="pages.contacts.subtitle"
      descriptionKey="pages.contacts.description"
      icon={<Phone className="w-8 h-8 text-primary" />}
      breadcrumbs={[{ labelKey: "nav.submenu.contacts" }]}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("pages.contacts.infoTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("pages.contacts.infoDescription")}
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.contentKey ? t(item.contentKey) : item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Google Maps */}
          <ContactMap address={ANPG_ADDRESS} />
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </PageLayout>
  );
}
