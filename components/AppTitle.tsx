type AppTitleProps = {
  children: React.ReactNode;
};

export default function AppTitle({ children }: AppTitleProps) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}
