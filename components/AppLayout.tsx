import Head from "next/head";
import AppHeader from "./AppHeader";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-full bg-slate-100">
      <Head>
        <meta
          name="description"
          content="“TV shows I’ve watched” tracker app for our clients using the TMDB API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-grow flex-col">
        <AppHeader />
        <main className="container">{children}</main>
      </div>
    </div>
  );
}
