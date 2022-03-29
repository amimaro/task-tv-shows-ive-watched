import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import AppPopularityIndicator from "./AppPopularityIndicator";

type AppMovieItemProps = {
  movie: any;
};

export default function AppMovieItem({ movie }: AppMovieItemProps) {
  return (
    <div className="cursor-pointer hover:opacity-80">
      <Link href={`/movie/${movie.id}`}>
        <a>
          <div className="mx-auto flex flex-col bg-slate-50 text-slate-900 rounded-lg shadow-md shadow-teal-500 max-w-[200px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              width={130}
              height={200}
              className="rounded-t-lg"
            />
            <div className="relative  flex flex-col p-2">
              <AppPopularityIndicator popularity={movie.popularity} />
              <div className="font-semibold pt-4">{movie.title}</div>
              <div className="font-light text-sm">
                {format(new Date(movie.release_date), "MMM dd, yyyy")}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
