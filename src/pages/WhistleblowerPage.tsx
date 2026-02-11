import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { ShieldCheck, Lock, Mail } from "lucide-react";

export default function WhistleblowerPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title="Canal de Denúncias"
      subtitle="Transparência e Integridade"
      breadcrumbs={[
        { label: "Canal de Denúncias" },
      ]}
    >
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <SectionTransition>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: ShieldCheck, title: "Confidencialidade", desc: "Garantia de protecção da identidade do denunciante" },
                { icon: Lock, title: "Segurança", desc: "Canal seguro e encriptado para submissão de denúncias" },
                { icon: Mail, title: "Acompanhamento", desc: "Seguimento e resposta a todas as denúncias recebidas" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-2xl p-8 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p>
                O Canal de Denúncias da ANPG é um mecanismo confidencial e seguro, disponível para colaboradores, parceiros e cidadãos, destinado à comunicação de irregularidades, condutas antiéticas ou situações que possam comprometer a integridade institucional.
              </p>
              <p>
                A ANPG garante a protecção dos denunciantes contra qualquer forma de retaliação, assegurando o tratamento adequado e tempestivo de todas as comunicações recebidas, em conformidade com a legislação aplicável.
              </p>
              <p>
                Para submeter uma denúncia, utilize os canais disponíveis abaixo ou contacte directamente a equipa de compliance da ANPG.
              </p>
            </div>
          </SectionTransition>

          <SectionTransition delay={0.3}>
            <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-10">
              <h2 className="text-xl font-bold text-foreground mb-4">Como Submeter uma Denúncia</h2>
              <div className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Email:</strong> compliance@anpg.co.ao</p>
                <p><strong className="text-foreground">Telefone:</strong> +244 226 428 000</p>
                <p className="text-sm italic">Todas as denúncias são tratadas com total confidencialidade.</p>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
    </PageLayout>
  );
}
