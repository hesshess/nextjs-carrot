"use client";
import { SWRConfig } from "swr";
import React from "react";

export const SWRProvider = ({
  children,
  refreshInterval,
}: {
  children: React.ReactNode;
  refreshInterval?: number;
}) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: refreshInterval ? refreshInterval : 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
