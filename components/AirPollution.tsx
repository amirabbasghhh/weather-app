"use client";
import { thermo } from "@/app/utils/Icons";
import { airQulaityIndexText } from "../app/utils/utils";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";
import Progress from "./Progress";

function AirPollution() {
  //   const { airQuality } = useGlobalContext();
  const { lat, lon } = useStore();
  const [polltion, setPollution] = useState<any>(null);

  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();
      setPollution(data);
    };

    fetchSunTimes();
  }, []);

  const airQualityIndex = polltion?.list[0].main.aqi * 10;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollusion
      </h2>
      <Progress height="15px" value={airQualityIndex} />
      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
  );
}

export default AirPollution;
