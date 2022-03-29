import popularMovies from "../pages/api/popular-movies";
import { AppButton } from "./AppButton";
import AppTitle from "./AppTitle";

type AppPaginatorProps = {
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

export default function AppPaginator({
  currentPage,
  handlePrevious,
  handleNext,
}: AppPaginatorProps) {
  return (
    <div className="flex justify-center gap-8">
      {currentPage > 1 ? (
        <AppButton className="w-32" onClick={handlePrevious}>
          Previous
        </AppButton>
      ) : (
        <div className="w-32"></div>
      )}
      <div className="border-b-2 px-4 py-2">
        <AppTitle>{currentPage}</AppTitle>
      </div>
      {popularMovies.length > 0 ? (
        <AppButton className="w-32" onClick={handleNext}>
          Next
        </AppButton>
      ) : (
        <div className="w-32"></div>
      )}
    </div>
  );
}
