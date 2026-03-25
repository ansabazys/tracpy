import { ReactNode } from "react";

interface OverviewStatRowProps {
  label: string;
  value: ReactNode;
  rate?: ReactNode;
  color?: string; // Hex color string for the optional left square indicator
}

interface OverviewStatPanelProps {
  title: string;
  mainValue: ReactNode;
  subtitle?: ReactNode;
  rows?: OverviewStatRowProps[];
}

export function OverviewStatPanel({ title, mainValue, subtitle, rows }: OverviewStatPanelProps) {
  return (
    <div className=" border border-zinc-900 bg-[#0a0a0a] p-5 shadow-none pb-4 flex flex-col justify-between h-full">
      <div>
        <h3 className="mb-2 font-mono text-[10px] tracking-widest text-[#888888] uppercase">
          {title}
        </h3>
        <p className=" text-[28px] font-normal tracking-wider text-white mt-1">
          {mainValue}
        </p>
        {subtitle && (
          <div className="mt-8 font-mono text-[10px] text-[#888888]">
            {subtitle}
          </div>
        )}
      </div>

      {rows && rows.length > 0 && (
        <div className="mt-6 flex flex-col gap-1.5 font-mono text-[10px] uppercase">
          {rows.map((row, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#888888]">
                {row.color && (
                  <div 
                    className="h-1.5 w-1.5 rounded-sm" 
                    style={{ backgroundColor: row.color }}
                  />
                )}
                <span>{row.label}</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span>{row.value}</span>
                {row.rate && (
                  <span className="text-[#888888] w-12 text-right">{row.rate}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
