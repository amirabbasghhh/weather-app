"use client";
// import { useGlobalContext } from "@/app/context/globalContext";
import { people } from "../app/utils/Icons";
import { formatNumber } from "../app/utils/utils";
// import { Skeleton } from "@/components/ui/skeleton";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";

function Population() {
  // const { fiveDayForecast } = useGlobalContext();
  const { lat, lon } = useStore();
  const [population, setPopulation] = useState<any>(null);
  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();
      setPopulation(data);
    };

    fetchSunTimes();
  }, []);

  // const { city } = fiveDayForecast;

  // if (!fiveDayForecast || !city) {
  //   return <Skeleton className="h-[12rem] w-full" />;
  // }

  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
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
