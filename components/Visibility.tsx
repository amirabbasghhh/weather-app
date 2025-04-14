"use client";
import { eye } from "../app/utils/Icons";
import { Skeleton } from "@/app/utils/skeleton";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";

function Visibility() {
  const { lat, lon } = useStore();
  const [visible, setVisible] = useState<any>(null);

  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();
      setVisible(data);
    };

    fetchSunTimes();
  }, []);

  if (!visible) {
    return <Skeleton className="w-full h-40 rounded-lg" />;
  }

  const  visibility  = visible?.visibility;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };
  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>

      <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
    </div>
  );
}

export default Visibility;
