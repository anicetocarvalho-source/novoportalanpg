import { useTranslation } from "react-i18next";
import {
  Search, FileText, Handshake, Award,
  Clock, Users, RefreshCw, Database,
  CheckCircle2, ArrowRight, Mail, MapPin
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-offshore.jpg";

const stepIcons = [Search, FileText, Handshake, Award];
const advantageIcons = [Clock, Handshake, RefreshCw, Database];

function SectionDivider({ label, icon: Icon }: { label?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border/60" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-background px-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

export default function PermanentOfferPage() {
  const { t } = useTranslation();

  const steps = t("pages.permanentOffer.howItWorks", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const advantages = t("pages.permanentOffer.advantages", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const blocks = t("pages.permanentOffer.blocks", { returnObjects: true }) as Array<{ name: string; basin: string; area: string; status: string; depth: string }>;
  const eligibility = t("pages.permanentOffer.eligibility", { returnObjects: true }) as string[];

  return (
    <PageLayout
      title={t("pages.permanentOffer.title")}
      subtitle={t("pages.permanentOffer.subtitle")}
      backgroundImage={heroImage}
      breadcrumbs={[
        { label: t("nav.opportunities"), href: "/opportunities" },
        { label: t("nav.submenu.permanentOffer") },
      ]}
    >
      {/* Intro */}
      <SectionTransition>
        <section className="mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {t("pages.permanentOffer.intro")}
          </p>
        </section>
      </SectionTransition>

      {/* How It Works - Numbered Steps */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            {t("pages.permanentOffer.howItWorksTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(steps) && steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="relative group p-6 rounded-2xl border border-border bg-card hover:shadow-card hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </SectionTransition>

      {/* Divider */}
      <SectionTransition delay={0.15}>
        <SectionDivider label={t("pages.permanentOffer.advantagesTitle")} icon={Users} />
      </SectionTransition>

      {/* Advantages */}
      <SectionTransition delay={0.2}>
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.isArray(advantages) && advantages.map((adv, i) => {
              const Icon = advantageIcons[i];
              return (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </SectionTransition>

      {/* Divider */}
      <SectionTransition delay={0.25}>
        <SectionDivider label={t("pages.permanentOffer.availableBlocksTitle")} icon={MapPin} />
      </SectionTransition>

      {/* Available Blocks Table */}
      <SectionTransition delay={0.3}>
        <section className="mb-16">
          <p className="text-muted-foreground mb-8 max-w-3xl">
            {t("pages.permanentOffer.availableBlocksIntro")}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-semibold text-foreground">{t("pages.permanentOffer.blockHeaders.name")}</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden sm:table-cell">{t("pages.permanentOffer.blockHeaders.basin")}</th>
                  <th className="text-left p-4 font-semibold text-foreground">{t("pages.permanentOffer.blockHeaders.area")}</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">{t("pages.permanentOffer.blockHeaders.depth")}</th>
                  <th className="text-left p-4 font-semibold text-foreground">{t("pages.permanentOffer.blockHeaders.status")}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(blocks) && blocks.map((block, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{block.name}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{block.basin}</td>
                    <td className="p-4 text-muted-foreground">{block.area}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{block.depth}</td>
                    <td className="p-4">
                      <Badge variant={block.status === t("pages.permanentOffer.statusAvailable") ? "default" : "secondary"} className={cn(
                        "text-xs",
                        block.status === t("pages.permanentOffer.statusAvailable")
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20"
                      )}>
                        {block.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </SectionTransition>

      {/* Divider */}
      <SectionTransition delay={0.35}>
        <SectionDivider label={t("pages.permanentOffer.eligibilityTitle")} icon={CheckCircle2} />
      </SectionTransition>

      {/* Eligibility */}
      <SectionTransition delay={0.4}>
        <section className="mb-16">
          <div className="max-w-3xl space-y-4">
            {Array.isArray(eligibility) && eligibility.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* CTA */}
      <SectionTransition delay={0.45}>
        <section className="max-w-2xl mx-auto text-center">
          <div className="p-10 rounded-2xl bg-primary/5 border border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {t("pages.permanentOffer.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("pages.permanentOffer.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="/contacts">
                  <Handshake className="w-4 h-4 mr-2" />
                  {t("pages.permanentOffer.ctaButton")}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:info@anpg.co.ao">
                  <Mail className="w-4 h-4 mr-2" />
                  {t("pages.permanentOffer.ctaEmail")}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}
