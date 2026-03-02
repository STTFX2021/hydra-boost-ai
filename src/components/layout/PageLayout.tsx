import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
