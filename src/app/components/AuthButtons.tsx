"use client";

import { signIn, signOut } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";

type AuthButtonProps = Omit<ButtonProps, "onClick">;

export function LoginButton(props: AuthButtonProps) {
  return <Button onClick={() => signIn()} {...props} />;
};

export function LogoutButton(props: AuthButtonProps) {
  return <Button onClick={() => signOut()} {...props} />;
};
