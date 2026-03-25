interface TopCountry {
  code: string;
  color: string;
  requests: string;
  rate: string;
}

interface OverviewMapOverlayProps {
  totalRequests: string;
  totalRate: string;
  topCountries: TopCountry[];
  regionCount: number;
}

export function OverviewMapOverlay({
  totalRequests,
  totalRate,
  topCountries,
  regionCount,
}: OverviewMapOverlayProps) {
  return (
    <div className="absolute top-[30%] left-0 z-10 font-mono flex flex-col gap-8 pointer-events-none">
      <div>
        <h3 className="text-[10px] tracking-widest text-[#888888] uppercase mb-1">
          Total visitors
        </h3>
        <p className="text-[32px] sm:text-[50px] font-sans tracking-wider font-semibold text-white leading-none">
          {totalRequests}
        </p>
        <p className="text-[10px] tracking-widest text-[#888888] uppercase mt-2">
          {totalRate} active users / day
        </p>
      </div>

      <div>
        <h3 className="text-[10px] tracking-widest text-[#888888] uppercase mb-3">
          Top Countries By Users
        </h3>
        <div className="flex flex-col gap-1.5 text-[11px]">
          {topCountries.map((country) => (
            <div key={country.code} className="flex items-center">
              <div className="w-1.5 h-1.5 mr-2" style={{ backgroundColor: country.color }} />
              <span className="text-[#3b82f6] font-bold w-6">{country.code}</span>
              <span className="text-white ml-2 tabular-nums">{country.requests}</span>
              <span className="text-[#888888] ml-2 tabular-nums">18.2%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center text-[10px] text-white">
          <span className="mr-1">▲</span> {regionCount} Active Regions
        </div>
      </div>
    </div>
  );
}
