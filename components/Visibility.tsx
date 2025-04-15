"use client";
import { eye } from "../app/utils/Icons";
import useStore from "@/lib/store";
import { Skeleton } from "@heroui/react";
import React, { useEffect, useState } from "react";

function Visibility() {
  const { lat, lon, setError } = useStore();
  const [visible, setVisible] = useState<any>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchSunTimes = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (!res.ok) {
          setError("something went wrong");
        }

        const data = await res.json();
        setVisible(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("unKnown error");
        }
      }
    };

    fetchSunTimes();
  }, [lat,lon]);

  if (!visible) {
    return <Skeleton className="w-full  h-40 rounded-lg" />;
  }

  const visibility = visible?.visibility;

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
