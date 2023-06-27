"use client";

import { TabsContent } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

type ProgressTabsContentProps = {
    children: React.ReactNode;
};

export default function ProgressTabsContent({
  children
}: ProgressTabsContentProps) {
  const pathname = usePathname();
  const value = pathname.split("/")[2];

  return (
    <TabsContent value={value} className="space-y-4">
      {children}
    </TabsContent>
  );
};
