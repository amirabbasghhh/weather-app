"use client";
import React, { useEffect, useState } from "react";

import { kelvinToCelsius } from "../app/utils/utils";

import { thermometer } from "@/app/utils/Icons";
import { Skeleton } from "@/app/utils/skeleton";
import useStore from "@/lib/store";


function FeelsLike() {
  const { lat, lon } = useStore();
  const [like, setLike] = useState<any>(null);

  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();

      setLike(data);
    };

    fetchSunTimes();
  }, []);

  if (!like) {
    return <Skeleton className="w-full h-40 rounded-lg" />;
  }
  
  const  feels_like = like?.main.feels_like;
  const temp_min=like?.main.temp_main
  const temp_max =like?.main.temp_max

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
