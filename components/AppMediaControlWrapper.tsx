type AppMediaControlWrapperProps = {
  children: React.ReactNode;
};

export default function AppMediaControlWrapper({
  children,
}: AppMediaControlWrapperProps) {
  return (
    <div className="absolute -top-1 w-full rounded-full transform -translate-y-1/2">
      <div className="flex justify-evenly">{children}</div>
    </div>
  );
}
