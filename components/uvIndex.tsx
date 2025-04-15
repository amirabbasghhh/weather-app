"use client";

import { sun } from "@/app/utils/Icons";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import useStore from "@/lib/store";
import UvProgress from "./UvProgress";

function UvIndex() {
  const { lat, lon, setError } = useStore();
  const [uv, setUv] = useState<any>(null);
  useEffect(() => {
    const fetchSunTimes = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
        );
        if (!res.ok) {
          setError("something went wrong");
        }

        const data = await res.json();
        setUv(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("unKnown error");
        }
      }
    };

    fetchSunTimes();
  }, []);

  if (!uv) {
    return <Skeleton className="h-40 w-full rounded-lg" />;
  }
  const { uv_index_max } = uv?.daily;

  const uvIndexMax = Number(uv_index_max[0].toFixed(0));

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    } else {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sun} Uv Index</h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexMax}
            <span className="text-sm">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress value={uvIndexMax} max={14} className="progress" />
        </div>
      </div>

      <p className="text-sm">{uvIndexCategory(uvIndexMax).protection} </p>
    </div>
  );
}

export default UvIndex;
