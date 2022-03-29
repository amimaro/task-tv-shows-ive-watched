import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { authActions, logoutAsync, selectIsAuth } from "../store/auth-slice";

export default function AppHeader() {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const linkClass =
    "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeLinkClass =
    "text-lg transition-opacity hover:opacity-70 border-b-2 border-teal-500";

  return (
    <header className="container mx-auto py-8 flex items-center justify-between">
      <nav className="flex gap-6 w-full">
        <Link href="/">
          <a className="md:pr-8">
            <Image
              className="hover:opacity-70"
              src="/logo.png"
              alt="logo"
              width={50}
              height={30}
            />
          </a>
        </Link>
        <Link href="/">
          <a
            className={cn(
              "md:block hidden",
              asPath === "/" ? activeLinkClass : linkClass
            )}
          >
            Home
          </a>
        </Link>
        <Link href="/favorites">
          <a className={asPath === "/favorites" ? activeLinkClass : linkClass}>
            Favorites
          </a>
        </Link>
        <div className="flex-grow"></div>
        {!isAuth && (
          <Link href="/login">
            <a className={asPath === "/login" ? activeLinkClass : linkClass}>
              Login
            </a>
          </Link>
        )}
        {isAuth && (
          <Link href="">
            <a className={linkClass} onClick={handleLogout}>
              Logout
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
}
