import { useTranslation } from "react-i18next";
import { HelpCircle, Building2, FileText, Users, Globe, Shield } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

interface FAQCategory {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  questions: {
    questionKey: string;
    answerKey: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "investment",
    icon: <Building2 className="w-5 h-5" />,
    titleKey: "faq.categories.investment.title",
    questions: [
      { questionKey: "faq.categories.investment.q1.question", answerKey: "faq.categories.investment.q1.answer" },
      { questionKey: "faq.categories.investment.q2.question", answerKey: "faq.categories.investment.q2.answer" },
      { questionKey: "faq.categories.investment.q3.question", answerKey: "faq.categories.investment.q3.answer" },
      { questionKey: "faq.categories.investment.q4.question", answerKey: "faq.categories.investment.q4.answer" },
    ],
  },
  {
    id: "tendering",
    icon: <FileText className="w-5 h-5" />,
    titleKey: "faq.categories.tendering.title",
    questions: [
      { questionKey: "faq.categories.tendering.q1.question", answerKey: "faq.categories.tendering.q1.answer" },
      { questionKey: "faq.categories.tendering.q2.question", answerKey: "faq.categories.tendering.q2.answer" },
      { questionKey: "faq.categories.tendering.q3.question", answerKey: "faq.categories.tendering.q3.answer" },
      { questionKey: "faq.categories.tendering.q4.question", answerKey: "faq.categories.tendering.q4.answer" },
    ],
  },
  {
    id: "contracts",
    icon: <Shield className="w-5 h-5" />,
    titleKey: "faq.categories.contracts.title",
    questions: [
      { questionKey: "faq.categories.contracts.q1.question", answerKey: "faq.categories.contracts.q1.answer" },
      { questionKey: "faq.categories.contracts.q2.question", answerKey: "faq.categories.contracts.q2.answer" },
      { questionKey: "faq.categories.contracts.q3.question", answerKey: "faq.categories.contracts.q3.answer" },
    ],
  },
  {
    id: "localContent",
    icon: <Users className="w-5 h-5" />,
    titleKey: "faq.categories.localContent.title",
    questions: [
      { questionKey: "faq.categories.localContent.q1.question", answerKey: "faq.categories.localContent.q1.answer" },
      { questionKey: "faq.categories.localContent.q2.question", answerKey: "faq.categories.localContent.q2.answer" },
      { questionKey: "faq.categories.localContent.q3.question", answerKey: "faq.categories.localContent.q3.answer" },
    ],
  },
  {
    id: "data",
    icon: <Globe className="w-5 h-5" />,
    titleKey: "faq.categories.data.title",
    questions: [
      { questionKey: "faq.categories.data.q1.question", answerKey: "faq.categories.data.q1.answer" },
      { questionKey: "faq.categories.data.q2.question", answerKey: "faq.categories.data.q2.answer" },
      { questionKey: "faq.categories.data.q3.question", answerKey: "faq.categories.data.q3.answer" },
    ],
  },
];

export default function FAQPage() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { labelKey: "faq.breadcrumb" },
  ];

  return (
    <PageLayout
      titleKey="faq.hero.title"
      descriptionKey="faq.hero.description"
      icon={<HelpCircle className="w-8 h-8" />}
      breadcrumbs={breadcrumbs}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("faq.intro")}
          </p>
        </div>

        {/* FAQ Categories */}
        {faqCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {t(category.titleKey)}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {category.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`${category.id}-${index}`}
                  className="bg-secondary/50 border border-border rounded-xl px-6 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground font-medium">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{t(faq.questionKey)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-8">
                    {t(faq.answerKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="text-center pt-8 pb-4 border-t border-border">
          <p className="text-muted-foreground mb-4">
            {t("faq.contactCta.text")}
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {t("faq.contactCta.link")}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
