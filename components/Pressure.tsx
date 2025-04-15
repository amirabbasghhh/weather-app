"use client";
// import { useGlobalContext } from "@/app/context/globalContext";
import { gauge } from "../app/utils/Icons";
import { Skeleton } from "@/app/utils/skeleton";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";

function Pressure() {
  const { lat, lon } = useStore();
  const [press, setPress] = useState<any>(null);

  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`
      );

      const data = await res.json();
      setPress(data);
    };

    fetchSunTimes();
  }, []);

  if (!press) {
    return <Skeleton className="w-full h-40 rounded-lg" />;
  }

  

  const  pressure  = press?.main.pressure;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">{getPressureDescription(pressure)}.</p>
    </div>
  );
}

export default Pressure;
