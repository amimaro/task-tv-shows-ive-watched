type AppPopularityIndicatorProps = {
  popularity: number;
};

export default function AppPopularityIndicator({
  popularity,
}: AppPopularityIndicatorProps) {
  return (
    <div className="bg-black text-white w-10 h-10 rounded-full border-4 border-teal-600 shadow-md">
      <div className="pt-1 pl-1.5 font-semibold">
        {(popularity / 100).toFixed(0)}
        <span className="text-xs">
          <sup>%</sup>
        </span>
      </div>
    </div>
  );
}
