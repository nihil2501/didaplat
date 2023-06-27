import "./globals.css";
import MainNav from "./components/MainNav";
import UserNav from "./components/UserNav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Didaplat",
  description: "Share curricula",
};

interface RootLayoutProps {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <h2 className="text-2xl font-bold tracking-tight">Didaplat</h2>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};
