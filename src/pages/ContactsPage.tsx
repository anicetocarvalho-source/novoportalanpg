import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

const ANPG_ADDRESS = "Edifício Torres do Carmo, Torre 2, Avenida de Portugal, Luanda, Angola";

export default function ContactsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="contacts"
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
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("pages.contacts.info.address.title")}
                </h3>
                <p className="text-muted-foreground">
                  Edifício Torres do Carmo - Torre 2<br />
                  Avenida de Portugal, Rua Lopes de Lima<br />
                  Município de Luanda, Angola
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("pages.contacts.info.phone.title")}
                </h3>
                <p className="text-muted-foreground">+244 226 428 000</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("pages.contacts.info.email.title")}
                </h3>
                <p className="text-muted-foreground">info@anpg.co.ao</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("pages.contacts.info.hours.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("pages.contacts.info.hours.content")}
                </p>
              </div>
            </div>
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
