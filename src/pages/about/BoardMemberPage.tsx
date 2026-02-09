import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, ChevronRight, Crown, Mail, MapPin, Phone, Quote, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBoardMemberBySlug, type Department, type BoardMember } from "@/data/boardData";
import heroImage from "@/assets/refinery.jpg";

/* ─── Department Card ─── */
function DepartmentCard({ dept, index, isEn }: { dept: Department; index: number; isEn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-2xl border border-border/50 bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-xs font-bold text-primary mb-1.5">
              {dept.acronym}
            </span>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {isEn ? dept.nameEn : dept.name}
            </h3>
          </div>
        </div>

        {dept.subDepartments && dept.subDepartments.length > 0 && (
          <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
            {dept.subDepartments.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <ChevronRight className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                <span>{isEn ? sub.nameEn : sub.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Biography Section ─── */
function BiographySection({ member, isEn }: { member: BoardMember; isEn: boolean }) {
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
            <p className="text-muted-foreground leading-relaxed text-base">
              {isEn ? member.bioEn : member.bio}
            </p>
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

/* ─── Message Section ─── */
function MessageSection({ member, isEn }: { member: BoardMember; isEn: boolean }) {
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
                "{isEn ? member.messageEn : member.message}"
              </p>
              <footer className="mt-4 text-sm font-semibold text-foreground">
                — {member.name}
              </footer>
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

/* ─── Contact Section ─── */
function ContactSection({ member, isEn }: { member: BoardMember; isEn: boolean }) {
  const { contact } = member;
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
            {contact.office && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {isEn ? contact.officeEn : contact.office}
                </span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SectionTransition>
  );
}

/* ─── Main Page ─── */
export default function BoardMemberPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const member = slug ? getBoardMemberBySlug(slug) : undefined;

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
            {isEn
              ? "The requested board member was not found."
              : "O membro do conselho solicitado não foi encontrado."}
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
      title={member.name}
      subtitle={isEn ? member.roleEn : member.role}
      backgroundImage={heroImage}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.anpg", href: "/about/anpg" },
        { label: member.name },
      ]}
    >
      {/* Back button */}
      <SectionTransition>
        <Button
          variant="ghost"
          onClick={() => navigate("/about/anpg")}
          className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isEn ? "Back to Board" : "Voltar ao Conselho"}
        </Button>
      </SectionTransition>

      {/* Member header */}
      <SectionTransition>
        <div className="flex items-start gap-6 mb-12">
          <div
            className={`relative flex-shrink-0 rounded-full overflow-hidden ${
              member.isPCA
                ? "w-24 h-24 md:w-28 md:h-28 ring-4 ring-primary/30 shadow-lg"
                : "w-20 h-20 md:w-24 md:h-24 ring-3 ring-border/50"
            }`}
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            {member.isPCA && (
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-background z-10">
                <Crown className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {member.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              {isEn ? member.roleEn : member.role}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.departments.map((dept) => (
                <span
                  key={dept.acronym}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary"
                >
                  {dept.acronym}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Biography & Message */}
      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <BiographySection member={member} isEn={isEn} />
        <MessageSection member={member} isEn={isEn} />
      </div>

      {/* Office Contact */}
      <div className="mb-10">
        <ContactSection member={member} isEn={isEn} />
      </div>

      <Separator className="mb-10" />

      {/* Portfolio / Pelouro */}
      <SectionTransition delay={0.25}>
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            {isEn ? "Portfolio" : "Pelouro"}
          </h2>
          <p className="text-muted-foreground">
            {isEn
              ? "Directorates, offices and units under this board member's responsibility."
              : "Direcções, gabinetes e núcleos sob a responsabilidade deste membro do conselho."}
          </p>
        </div>
      </SectionTransition>

      <div className="grid gap-5 md:grid-cols-2">
        {member.departments.map((dept, index) => (
          <DepartmentCard
            key={dept.acronym}
            dept={dept}
            index={index}
            isEn={isEn}
          />
        ))}
      </div>
    </PageLayout>
  );
}
