import React from "react";

export default function FormatCash(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return `${+(n / 1e3).toFixed(0)}K`;
  if (n >= 1e6 && n < 1e9) return `${+(n / 1e6).toFixed(0)}M`;
  if (n >= 1e9 && n < 1e12) return `${+(n / 1e9).toFixed(0)}B`;
  if (n >= 1e12) return `${+(n / 1e12).toFixed(0)}T`;
}
