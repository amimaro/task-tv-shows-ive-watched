import Head from "next/head";
import AppHeader from "./AppHeader";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-full">
      <Head>
        <meta
          name="description"
          content="“TV shows I’ve watched” tracker app for our clients using the TMDB API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-grow flex-col h-full">
        <AppHeader />
        <main className="container mx-auto h-full">{children}</main>
      </div>
    </div>
  );
}
