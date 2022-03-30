import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markAsFavoriteAsync,
  selectFavoriteMovies,
  selectFavoriteShows,
} from "../store/favorite-slice";

const HeartIndicator = ({ marked }: { marked: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 ${marked ? "text-red-400" : "text-slate-400"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type AppFavoriteIndicatorProps = {
  viewOnly?: boolean;
  mediaId: number;
  mediaType: string;
};

export default function AppFavoriteIndicator({
  viewOnly,
  mediaId,
  mediaType,
}: AppFavoriteIndicatorProps) {
  const dispatch = useDispatch();
  const [marked, setMarked] = useState(false);

  const favoriteMovies = useSelector(selectFavoriteMovies);
  const favoriteShows = useSelector(selectFavoriteShows);

  useEffect(() => {
    const medias = mediaType === "movie" ? favoriteMovies : favoriteShows;
    const isMarked = medias.find((media: any) => media.id === mediaId);
    if (isMarked) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [favoriteMovies, favoriteShows, mediaId, mediaType]);

  const handleFavorite = () => {
    dispatch(
      markAsFavoriteAsync({
        favorite: !marked,
        media_id: mediaId,
        media_type: mediaType,
      })
    );
  };
  return (
    <div className="absolute -top-1 right-3  w-10 h-10 transform -translate-y-1/2">
      {viewOnly ? (
        <HeartIndicator marked={marked} />
      ) : (
        <button onClick={handleFavorite}>
          <HeartIndicator marked={marked} />
        </button>
      )}
    </div>
  );
}
