"use client";
import { wind } from "../app/utils/Icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useStore from "@/lib/store";
import { Skeleton } from "@heroui/react";

function Wind() {
  const { lat, lon } = useStore();
  const [windd, setWindd] = useState<any>(null);
  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();
      setWindd(data);
    };

    fetchSunTimes();
  }, []);

  const windSpeed = windd?.wind?.speed;
  const windDir = windd?.wind?.deg;

  if (!windd) {
    return <Skeleton className=" w-full h-40 rounded-lg" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 h-full border rounded-lg flex 
    flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium">{wind} Wind</h2>

      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
            dark:text-white font-medium"
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}

export default Wind;
