import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageHero } from "./PageHero";
import { PageBreadcrumb, BreadcrumbItem } from "./PageBreadcrumb";
import { PageTransition } from "./PageTransition";
import { SectionTransition } from "./SectionTransition";

interface PageLayoutProps {
  titleKey: string;
  subtitleKey?: string;
  descriptionKey?: string;
  backgroundImage?: string;
  icon?: ReactNode;
  heroChildren?: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export function PageLayout({
  titleKey,
  subtitleKey,
  descriptionKey,
  backgroundImage,
  icon,
  heroChildren,
  breadcrumbs,
  children,
}: PageLayoutProps) {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <PageHero
          titleKey={titleKey}
          subtitleKey={subtitleKey}
          descriptionKey={descriptionKey}
          backgroundImage={backgroundImage}
          icon={icon}
        >
          {heroChildren}
        </PageHero>

        {/* Breadcrumb */}
        <PageBreadcrumb items={breadcrumbs} />

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <SectionTransition>
            <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
              {children}
            </div>
          </SectionTransition>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
