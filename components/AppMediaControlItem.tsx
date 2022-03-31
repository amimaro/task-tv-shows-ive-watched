type AppMediaControlItemProps = {
  children: React.ReactNode;
};

export default function AppMediaControlItem({
  children,
}: AppMediaControlItemProps) {
  return (
    <div className="bg-slate-800 text-white w-10 h-10 rounded-full border-4 border-teal-600 shadow-md">
      {children}
    </div>
  );
}
