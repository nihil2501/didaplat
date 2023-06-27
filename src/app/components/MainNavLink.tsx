"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavLinkProps {
  label: string;
  href: string;
};

export default function MainNavLink({ label, href }: MainNavLinkProps) {
  const pathname = usePathname();
  const activeHref = getPathComponent(pathname, 1);
  const targetHref = getPathComponent(href, 1);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        { "text-muted-foreground": targetHref !== activeHref }
      )}
    >
      {label}
    </Link>
  );
};

function getPathComponent(path: string, component: number) {
  return path.split("/")[component];
};
