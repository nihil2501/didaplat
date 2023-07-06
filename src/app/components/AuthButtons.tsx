"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";

// Copying from:
//   * https://github.com/chronark/unkey/blob/cd9a4bf48ee9ea54fe61299693d5604068fda007/apps/web/app/(authenticated)/(app)/app/TeamSwitcher.tsx
//   * https://github.com/clerkinc/javascript/blob/276ef8e7a332f8604ef9956af6386db14187a68a/packages/react/src/utils/childrenUtils.tsx
export const LoginButton = AuthButton({
  defaultText: "Log in",
  componentName: "LoginButton",
  onClick: () => signIn(),
});

export const LogoutButton = AuthButton({
  defaultText: "Log out",
  componentName: "LogoutButton",
  onClick: () => signOut(),
});

type AuthButtonProps =
  Required<Pick<React.DOMAttributes<Element>, "onClick">> & {
    componentName: "LoginButton" | "LogoutButton";
    defaultText: string;
  };

function AuthButton({ defaultText, componentName, onClick }: AuthButtonProps) {
  return ({ children, ...props }: React.PropsWithChildren) => {
    children = normalizeWithDefaultValue(children, defaultText);
    const child = assertSingleChild(children)(componentName);

    const wrappedOnClick: React.MouseEventHandler =
      async function(event) {
        await safeExecute((child as any).props.onClick)(event);
        return onClick(event);
      };

    const childProps = { ...props, onClick: wrappedOnClick };
    const element = React.cloneElement(
      child as React.ReactElement<unknown>,
      childProps
    );

    return element;
  };
};

function assertSingleChild(children: React.ReactNode) {
  return (name: AuthButtonProps["componentName"]) => {
    try {
      return React.Children.only(children);
    } catch (e) {
      throw new Error(`You"ve passed multiple children components to <${name}/>. You can only pass a single child component or text.`);
    }
  };
};

function normalizeWithDefaultValue(
  children: React.ReactNode | undefined,
  defaultText: string
) {
  if (!children) {
    children = defaultText;
  }

  if (typeof children === "string") {
    children = <button>{children}</button>;
  }

  return children;
};

function safeExecute(cb: unknown) {
  return (...args: any) => {
    if (cb && typeof cb === "function") {
      return cb(...args);
    }
  };
};
