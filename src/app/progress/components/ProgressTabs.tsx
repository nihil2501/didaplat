import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressTabsContent from "./ProgressTabsContent";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import Link from "next/link";
import { JSX, RefAttributes } from "react";

type ProgressTabsProps = {
    children: React.ReactNode;
};

export default function ProgressTabs({ children }: ProgressTabsProps) {
  return (
    <Tabs defaultValue="series" className="space-y-4">
      <TabsList>
        <ProgressTab value="series">Series</ProgressTab>
        <ProgressTab value="courses">Courses</ProgressTab>
        <ProgressTab value="lessons">Lessons</ProgressTab>
      </TabsList>
      <ProgressTabsContent>
        {children}
      </ProgressTabsContent>
    </Tabs>
  );
};

type ProgressTabProps =
  JSX.IntrinsicAttributes &
  RefAttributes<HTMLButtonElement> &
  Omit<TabsTriggerProps & RefAttributes<HTMLButtonElement>,
    "ref">;

function ProgressTab({
  children,
  value,
  ...props
}: ProgressTabProps) {
  return (
    <TabsTrigger value={value} {...props}>
      <Link href={`/progress/${value}`}>{children}</Link>
    </TabsTrigger>
  );
};
