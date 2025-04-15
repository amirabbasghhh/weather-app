"use client";
import { people } from "../app/utils/Icons";
import { formatNumber } from "../app/utils/utils";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";
import {Skeleton} from "@heroui/react";

function Population() {
  const { lat, lon,setError } = useStore();
  const [population, setPopulation] = useState<any>(null);
  const apiKey=process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    const fetchSunTimes = async () => {
      try{
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (!res.ok) {
          setError("something went wrong");
          
        }
  
        const data = await res.json();
        setPopulation(data);

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
  }, [lat,lon]);

  // const { city } = fiveDayForecast;

  if (!population ) {
    return <Skeleton className=" w-full h-40 rounded-lg" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">
          {formatNumber(population?.city?.population)}
        </p>
      </div>
      <p className="text-sm">
        Latest UN population data for{" "}
        <span className="font-bold"> {population?.city?.name} </span> .
      </p>
      <div className="flex flex-col gap-y-4">
        <p>
          <span className="font-extrabold">latitude: </span>
          {population?.city?.coord.lat}
        </p>
        <p>
          <span className="font-extrabold">longitude: </span>
          {population?.city?.coord.lon}
        </p>
      </div>
    </div>
  );
}

export default Population;
