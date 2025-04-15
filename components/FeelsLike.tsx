"use client";
import React, { useEffect, useState } from "react";

import { kelvinToCelsius } from "../app/utils/utils";

import { thermometer } from "@/app/utils/Icons";
import useStore from "@/lib/store";
import { Skeleton } from "@heroui/react";

function FeelsLike() {
  const { lat, lon, error, setError } = useStore();
  const [like, setLike] = useState<any>(null);
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
        setLike(data);
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

  if (!like) {
    return <Skeleton className="w-full h-40 rounded-lg" />;
  }

  const feels_like = like?.main?.feels_like;
  const temp_min = like?.main?.temp_main;
  const temp_max = like?.main?.temp_max;

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
