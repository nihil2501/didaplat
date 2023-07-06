import { cn } from "@/lib/utils";
import Link from "next/link";

interface MainNavProps {
  className: string;
}

export default async function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <MainNavLink href="/">Explore</MainNavLink>
      <MainNavLink href="/create">Create</MainNavLink>
      <MainNavLink href="/progress">Progress</MainNavLink>
    </nav>
  );
};

interface MainNavLinkProps {
  children: React.ReactNode;
  href: string;
};

function MainNavLink(props: MainNavLinkProps) {
  return (
    <Link {...props} className="text-sm font-medium transition-colors
      hover:text-primary" />
  );
};
