import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProgressTabs from "./components/ProgressTabs";

type ProgressLayoutProps = {
    children: React.ReactNode;
};

export default async function ProgressLayout({ children }: ProgressLayoutProps) {
  const session = await getServerSession();
  if (!session) redirect("/explore");

  return (
    <ProgressTabs>{children}</ProgressTabs>
  );
};
