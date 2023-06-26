"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface LoginLinkProps {
  children: React.ReactNode;
};

export function LoginLink({ children }: LoginLinkProps ) {
  return (
    <Button variant="link" onClick={() => signIn()}>
      {children}
    </Button>
  );
};

interface LogoutLinkProps {
  children: React.ReactNode;
};

export function LogoutLink({ children }: LogoutLinkProps) {
  return (
    <Button variant="link" onClick={() => signOut({ callbackUrl: "/explore" })}>
      {children}
    </Button>
  );
};
