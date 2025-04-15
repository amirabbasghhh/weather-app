"use client";
import { droplets } from "../app/utils/Icons";
import { Skeleton } from "@/app/utils/skeleton";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";

function Humidity() {
  const { lat, lon,setError } = useStore();
  const [hum, setHum] = useState<any>(null);
  const apiKey=process.env.NEXT_PUBLIC_API_KEY


  useEffect(() => {
    const fetchSunTimes = async () => {
      try{
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!res.ok) {
          setError("something went wrong");
        }
  
        const data = await res.json();
        
        setHum(data);

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

  if (!hum) {
    return <Skeleton className="h-40 rounded-lg w-full" />;
  }

  const  humidity  = hum?.main?.humidity;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityText(humidity)}.</p>
    </div>
  );
}

export default Humidity;
