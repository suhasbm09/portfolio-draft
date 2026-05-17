import React from "react";
import { brand } from "../data/portfolio";

const BrandMark = ({ compact = false }) => {
  return (
    <div className="min-w-0">
      <p className={`font-semibold tracking-[0.45em] text-white/90 ${compact ? "text-xs" : "text-sm"}`}>SBM</p>
      {!compact && <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/35">{brand.name}</p>}
    </div>
  );
};

export default BrandMark;