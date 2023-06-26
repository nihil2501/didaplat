import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";

interface AppChromeProps {
  children: React.ReactNode;
  activeHref: string;
};

export default async function AppChrome({
  children,
  activeHref
}: AppChromeProps) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-3xl font-bold tracking-tight mx-4">Didaplat</h2>
          <MainNav activeHref={activeHref} className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {children}
      </div>
    </div>
  );
};
