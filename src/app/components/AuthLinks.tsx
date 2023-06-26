"use client";

import { signIn, signOut } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";

type AuthLinkProps = Omit<ButtonProps, "onClick" | "variant">;

export function LoginLink(props: AuthLinkProps) {
  return (
    <Button
      variant="link"
      onClick={() => signIn()}
      {...props}
    />
  );
};

export function LogoutLink(props: AuthLinkProps) {
  return (
    <Button
      variant="link"
      onClick={() => signOut({ callbackUrl: "/explore" })}
      {...props}
    />
  );
};
