"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavLinkProps {
  label: string;
  href: string;
};

export default function MainNavLink({ label, href }: MainNavLinkProps) {
  const activeHref = usePathname();
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
