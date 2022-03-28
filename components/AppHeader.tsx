import Link from "next/link";
import { useRouter } from "next/router";

export default function AppHeader() {
  const { asPath } = useRouter();

  const linkClass =
    "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeLinkClass =
    "text-lg transition-opacity hover:opacity-70 border-b-2 border-teal-500";

  return (
    <header className="container mx-auto py-8 flex items-center justify-between">
      <nav className="flex gap-6 w-full">
        <Link href="/">
          <a>LOGO</a>
        </Link>
        <Link href="/">
          <a className={asPath === "/" ? activeLinkClass : linkClass}>Home</a>
        </Link>
        <Link href="/favorites">
          <a className={asPath === "/favorites" ? activeLinkClass : linkClass}>
            Favorites
          </a>
        </Link>
        <div className="flex-grow"></div>
        <Link href="/login">
          <a className={asPath === "/login" ? activeLinkClass : linkClass}>
            Login
          </a>
        </Link>
        <Link href="/logout">
          <a className={asPath === "/logout" ? activeLinkClass : linkClass}>
            Logout
          </a>
        </Link>
      </nav>
    </header>
  );
}
