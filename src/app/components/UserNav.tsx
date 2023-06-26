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

function getInitials(name: string) {
  return name
    .trim().split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join('');
};

export default async function UserNav() {
  const session = await getServerSession();

  if (!session) {
    return (
      <LoginButton variant="link" className="h-full p-0">
        <LogIn className="mr-2 h-4 w-4" />
        <span>Log in</span>
      </LoginButton>
    );
  }

  const name = session.user?.name ?? "";
  const email = session.user?.email ?? "";
  const image = session.user?.image ?? "";
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
        <DropdownMenuItem>
          <LogoutButton variant="link" className="h-full p-0">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
