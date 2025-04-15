"use client";
import React, { useEffect, useState } from "react";

import { kelvinToCelsius, unixToDay } from "../app/utils/utils";

import { calender } from "@/app/utils/Icons";
import { Skeleton } from "@/app/utils/skeleton";
import useStore from "@/lib/store";
import { Progress } from "@heroui/react";
import CustomProgress from "./CustomProgress";

function FiveDayForecast() {
  const { lat, lon,setError } = useStore();
  const [five, setFive] = useState<any>(null);
  const apiKey=process.env.NEXT_PUBLIC_API_KEY


  useEffect(() => {
    const fetchSunTimes = async () => {
      try{

        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!res.ok) {
          setError("something went wrong");
        }
  
        const data = await res.json();
  
        setFive(data);
      }
      catch(error){
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("unKnown error");
        }

      }
    };

    fetchSunTimes();
  }, []);

  const city = five?.city;
  const list = five?.list;

  if (!five) {
    return <Skeleton className="w-full h-40 rounded-lg" />;
  }

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);

    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5-Day Forecast for {city.name}
        </h2>

        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className=" py-4 flex flex-col justify-evenly border-b"
              >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-between gap-x-2">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">{day.minTemp}°C</p>
                  <div className="flex-1 w-full h-2 rounded-lg">
                    <CustomProgress value={100} />
                  </div>
                  <p className="font-bold">{day.maxTemp}°C</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;
