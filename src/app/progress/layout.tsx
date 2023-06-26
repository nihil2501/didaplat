import AppChrome from "@/components/AppChrome";

interface ProgressLayoutProps {
  children: React.ReactNode;
}

export default function ProgressLayout({ children }: ProgressLayoutProps) {
  return (
    <AppChrome activeHref="/progress">
      {children}
    </AppChrome>
  )
};