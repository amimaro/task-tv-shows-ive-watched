type AppMediaWrapperProps = {
  children: React.ReactNode;
};

export default function AppMediaWrapper({ children }: AppMediaWrapperProps) {
  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4 py-8">
      {children}
    </div>
  );
}
