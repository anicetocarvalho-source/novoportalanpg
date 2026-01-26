import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageHero } from "./PageHero";
import { PageBreadcrumb, BreadcrumbItem } from "./PageBreadcrumb";
import { SectionTransition } from "./SectionTransition";

interface PageLayoutProps {
  titleKey?: string;
  title?: string;
  subtitleKey?: string;
  subtitle?: string;
  descriptionKey?: string;
  description?: string;
  backgroundImage?: string;
  icon?: ReactNode;
  heroChildren?: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export function PageLayout({
  titleKey,
  title,
  subtitleKey,
  subtitle,
  descriptionKey,
  description,
  backgroundImage,
  icon,
  heroChildren,
  breadcrumbs,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <PageHero
        titleKey={titleKey}
        title={title}
        subtitleKey={subtitleKey}
        subtitle={subtitle}
        descriptionKey={descriptionKey}
        description={description}
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
  );
}
