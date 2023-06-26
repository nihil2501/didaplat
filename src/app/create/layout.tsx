import AppChrome from "@/components/AppChrome";

interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function CreateLayout({ children }: CreateLayoutProps) {
  return (
    <AppChrome activeHref="/create">
      {children}
    </AppChrome>
  )
};