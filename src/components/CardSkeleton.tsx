const CardSkeletons = () => {
  return (
    <div className="flex items-center justify-between gap-5 flex-wrap">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default CardSkeletons;

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-[295px] flex-1 basis-[250px]">
      <div className="w-full h-[220px] rounded-md bg-slate-400 animate-pulse" />
      <span className="w-44 h-3 bg-slate-400 animate-pulse mt-2 mb-1 rounded" />
      <span className="w-24 h-3 bg-slate-400 animate-pulse rounded" />
    </div>
  );
};
