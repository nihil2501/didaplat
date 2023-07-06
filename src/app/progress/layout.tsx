type ProgressLayoutProps = {
  children: React.ReactNode;
};

export default function ProgressLayout({
	children
}: ProgressLayoutProps) {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-normal tracking-tight">Progress</h2>
      </div>

      {children}
    </>
  );
};
