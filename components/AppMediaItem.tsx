import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import AppPopularityIndicator from "./AppPopularityIndicator";

type AppMediaItemProps = {
  name: string;
  date: string;
  path: string;
  poster: string;
  popularity: number;
};

export default function AppMediaItem({
  name,
  date,
  path,
  poster,
  popularity,
}: AppMediaItemProps) {
  return (
    <div className="cursor-pointer hover:opacity-80">
      <Link href={path}>
        <a>
          <div className="mx-auto flex flex-col bg-slate-50 text-slate-900 rounded-lg shadow-md shadow-teal-500 max-w-[200px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={`${name} poster`}
              width={130}
              height={200}
              className="rounded-t-lg"
            />
            <div className="relative  flex flex-col p-2">
              <AppPopularityIndicator popularity={popularity} />
              <div className="font-semibold pt-4">{name}</div>
              {date && date.length > 0 && (
                <div className="font-light text-sm">
                  {format(new Date(date), "MMM dd, yyyy")}
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
