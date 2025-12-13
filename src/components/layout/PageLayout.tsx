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
      <Header />
      <main className="pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
