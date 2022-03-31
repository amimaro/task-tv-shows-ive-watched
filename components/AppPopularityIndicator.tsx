type AppPopularityIndicatorProps = {
  popularity: number;
};

export default function AppPopularityIndicator({
  popularity,
}: AppPopularityIndicatorProps) {
  return (
    <div className="pt-1 pl-1.5 font-semibold">
      {(popularity / 100).toFixed(0)}
      <span className="text-xs">
        <sup>%</sup>
      </span>
    </div>
  );
}
