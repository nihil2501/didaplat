import AppChrome from "@/components/AppChrome";

interface ExploreLayoutProps {
  children: React.ReactNode;
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <AppChrome activeHref="/explore">
      {children}
    </AppChrome>
  )
};