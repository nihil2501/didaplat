import { getServerSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import MainNavLink from "./MainNavLink";

type MainNavProps =
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default async function MainNav({
  className,
  ...props
}: MainNavProps) {
  const session = await getServerSession();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <MainNavLink href="/explore" label="Explore" />
      <MainNavLink href="/create" label="Create" />
      {session && <MainNavLink href="/progress" label="Progress" />}
    </nav>
  );
};
