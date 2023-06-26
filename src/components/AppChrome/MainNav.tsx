import { getServerSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MainNavProps =
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
  { activeHref: string; };

export async function MainNav({
  className,
  activeHref,
  ...props
}: MainNavProps) {
  const session = await getServerSession();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink href="/explore" activeHref={activeHref} label="Explore" />
      <NavLink href="/create" activeHref={activeHref} label="Create" />
      {session && <NavLink href="/progress" activeHref={activeHref} label="Progress" />}
    </nav>
  );
};

interface NavLinkProps {
  label: string;
  href: string;
  activeHref: string;
};

function NavLink({ label, href, activeHref }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        { "text-muted-foreground": href !== activeHref }
      )}
    >
      {label}
    </Link>
  );
};
