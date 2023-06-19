"use client";

import { SignOutParams, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()}>
      Log in
    </Button>
  );
};

type LogoutButtonProps = SignOutParams<true> | undefined;
export const LogoutButton = (props: LogoutButtonProps) => {
  return (
    <Button onClick={() => signOut(props)}>
      Log out
    </Button>
  );
};
