import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Progress() {
  const session = await getServerSession();
  if (!session) redirect("/explore");

  return (
    <>
      <h1>Progress</h1>
    </>
  );
};