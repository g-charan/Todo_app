"use client";
import { createContext, useState } from "react";

const MetricsContext = createContext<any>(null);

export const MetricsProvider = ({ children }: any) => {
  const [metrics, setMetrics] = useState<any>();
  return (
    <MetricsContext.Provider value={[metrics, setMetrics]}>
      {children}
    </MetricsContext.Provider>
  );
};
