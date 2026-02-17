import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Mail, MapPin, Phone, Quote, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useBoardMemberBySlug, type CMSBoardMember } from "@/hooks/useCMSData";
import heroImage from "@/assets/refinery.jpg";

// Fallback photos
import paulinoPhoto from "@/assets/board/paulino-jeronimo.jpg";
import arturPhoto from "@/assets/board/artur-custodio.jpg";
import anaPhoto from "@/assets/board/ana-miala.jpg";
import nicolaPhoto from "@/assets/board/nicola-mvuayi.jpg";
import alcidesPhoto from "@/assets/board/alcides-andrade.jpg";

const photoFallbacks: Record<string, string> = {
  "paulino-jeronimo": paulinoPhoto,
  "artur-custodio": arturPhoto,
  "ana-miala": anaPhoto,
  "nicola-mvuayi": nicolaPhoto,
  "alcides-andrade": alcidesPhoto,
};

function BiographySection({ member, isEn }: { member: CMSBoardMember; isEn: boolean }) {
  return (
    <SectionTransition delay={0.1}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isEn ? "Biography" : "Biografia"}
            </h2>
          </div>
          <div className="px-6 pb-6">
            <p className="text-muted-foreground leading-relaxed text-base">{member.bio || ""}</p>
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

function MessageSection({ member, isEn }: { member: CMSBoardMember; isEn: boolean }) {
  if (!member.message) return null;
  return (
    <SectionTransition delay={0.15}>
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Quote className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isEn ? "Message" : "Mensagem"}
            </h2>
          </div>
          <div className="px-6 pb-6">
            <blockquote className="relative pl-5 border-l-4 border-primary/30">
              <p className="text-muted-foreground leading-relaxed text-base italic">
                "{member.message}"
              </p>
              <footer className="mt-4 text-sm font-semibold text-foreground">— {member.full_name}</footer>
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

function ContactSection({ member, isEn }: { member: CMSBoardMember; isEn: boolean }) {
  if (!member.phone && !member.email && !member.office_location) return null;
  return (
    <SectionTransition delay={0.2}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isEn ? "Office Contact" : "Contacto do Gabinete"}
            </h2>
          </div>
          <div className="px-6 pb-6 space-y-4">
            {member.office_location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{member.office_location}</span>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <a href={`tel:${member.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {member.phone}
                </a>
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <a href={`mailto:${member.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {member.email}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

export default function BoardMemberPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const { data: member, isLoading } = useBoardMemberBySlug(slug);
  const photo = member?.photo_url || photoFallbacks[slug || ""] || "";
  const isPCA = member?.group_key === "pca";

  if (isLoading) {
    return (
      <PageLayout title="..." backgroundImage={heroImage} breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.anpg", href: "/about/anpg" },
        { label: "..." },
      ]}>
        <div className="space-y-6">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!member) {
    return (
      <PageLayout
        title={isEn ? "Member Not Found" : "Membro Não Encontrado"}
        backgroundImage={heroImage}
        breadcrumbs={[
          { labelKey: "nav.aboutUs", href: "/about" },
          { labelKey: "nav.submenu.anpg", href: "/about/anpg" },
          { label: isEn ? "Board Member" : "Membro" },
        ]}
      >
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">
            {isEn ? "The requested board member was not found." : "O membro do conselho solicitado não foi encontrado."}
          </p>
          <Button onClick={() => navigate("/about/anpg")} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEn ? "Back to ANPG" : "Voltar à ANPG"}
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={member.full_name}
      subtitle={member.role || member.title}
      backgroundImage={heroImage}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.anpg", href: "/about/anpg" },
        { label: member.full_name },
      ]}
    >
      <SectionTransition>
        <Button variant="ghost" onClick={() => navigate("/about/anpg")} className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isEn ? "Back to Board" : "Voltar ao Conselho"}
        </Button>
      </SectionTransition>

      <SectionTransition>
        <div className="flex items-start gap-6 mb-12">
          <div className={`relative flex-shrink-0 rounded-full overflow-hidden ${
            isPCA ? "w-24 h-24 md:w-28 md:h-28 ring-4 ring-primary/30 shadow-lg" : "w-20 h-20 md:w-24 md:h-24 ring-3 ring-border/50"
          }`}>
            <img src={photo} alt={member.full_name} className="w-full h-full object-cover" />
            {isPCA && (
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-background z-10">
                <Crown className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{member.full_name}</h1>
            <p className="text-lg text-muted-foreground mt-1">{member.role || member.title}</p>
          </div>
        </div>
      </SectionTransition>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <BiographySection member={member} isEn={isEn} />
        <MessageSection member={member} isEn={isEn} />
      </div>

      <div className="mb-10">
        <ContactSection member={member} isEn={isEn} />
      </div>
    </PageLayout>
  );
}
