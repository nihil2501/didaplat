import './globals.css';
import { Inter } from 'next/font/google';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { LoginButton, LogoutButton } from '@/components/Buttons';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Didaplat',
  description: 'Share curricula',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <h1>Didaplat</h1>
          {session ? <LogoutButton callbackUrl={"/explore"} /> : <LoginButton />}
          <Link href={"/explore"}>Explore</Link>
          <Link href={"/create"}>Create</Link>
          {session && <Link href={"/progress"}>Progress</Link>}
          {children}
        </main>
      </body>
    </html>
  );
};
