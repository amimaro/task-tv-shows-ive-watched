type AppSubtitleProps = {
  children: React.ReactNode;
};

export default function AppSubtitle({ children }: AppSubtitleProps) {
  return <h1 className="text-lg font-bold">{children}</h1>;
}
