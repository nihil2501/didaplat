import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut } from "lucide-react";
import { getServerSession } from "@/lib/auth";
import { LogoutButton, LoginButton } from "./AuthButtons";
import { Session } from "next-auth";

export default async function UserNav() {
  const session = await getServerSession();

  if (!session) {
    return (
      <LoginButton>
        <Button variant="ghost">
          <LogIn className="mr-2 h-4 w-4" />
          Log in
        </Button>
      </LoginButton>
    );
  }

  const name = getUserProperty(session, "name");
  const email = getUserProperty(session, "email");
  const image = getUserProperty(session, "image");
  const fallback = getInitials(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem asChild className="cursor-pointer">
            <div>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </div>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function getUserProperty(
  session: Session | null,
  property: keyof NonNullable<Session["user"]>
) {
  const user = session?.user;
  if (!user) return "";

  const value = user[property];
  if (!value) return "";
  
  return value;
};

function getInitials(name: string) {
  return name
    .trim().split(/\s+/)
    .map(w => w[0].toUpperCase())
    .join('');
};
