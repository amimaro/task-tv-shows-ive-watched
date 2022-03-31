import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import AppPopularityIndicator from "./AppPopularityIndicator";
import AppFavoriteIndicator from "./AppFavoriteIndicator";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/auth-slice";
import AppViewedIndicator from "./AppViewedIndicator";
import AppMediaControlWrapper from "./AppMediaControlWrapper";
import AppMediaControlItem from "./AppMediaControlItem";

type AppMediaItemProps = {
  id: number;
  name: string;
  date: string;
  path: string;
  poster: string;
  popularity: number;
  mediaType: "tv" | "movie";
  mediaObj: any;
};

export default function AppMediaItem({
  id,
  name,
  date,
  path,
  poster,
  popularity,
  mediaType,
  mediaObj,
}: AppMediaItemProps) {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="cursor-pointer hover:opacity-80">
      <div className="mx-auto flex flex-col bg-slate-50 text-slate-900 rounded-lg shadow-md shadow-teal-500 max-w-[200px]">
        <Link href={path}>
          <a>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={`${name} poster`}
              width={200}
              height={200}
              className="rounded-t-lg"
            />
          </a>
        </Link>
        <div className="relative">
          <AppMediaControlWrapper>
            <AppMediaControlItem>
              <AppPopularityIndicator popularity={popularity} />
            </AppMediaControlItem>
            {isAuth && (
              <>
                <AppMediaControlItem>
                  <AppViewedIndicator
                    mediaId={id}
                    mediaType={mediaType}
                    mediaObj={mediaObj}
                  />
                </AppMediaControlItem>
                <AppMediaControlItem>
                  <AppFavoriteIndicator mediaId={id} mediaType={mediaType} />
                </AppMediaControlItem>
              </>
            )}
          </AppMediaControlWrapper>
        </div>
        <Link href={path}>
          <a>
            <div className="flex flex-col p-2 h-24 justify-end">
              <div className="font-semibold">{name}</div>
              {date && date.length > 0 && (
                <div className="font-light text-sm">
                  {format(new Date(date), "MMM dd, yyyy")}
                </div>
              )}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
