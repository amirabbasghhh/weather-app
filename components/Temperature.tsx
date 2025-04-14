"use client";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "../app/utils/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import useStore from "@/lib/store";
// types.ts
export interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  

function Temperature() {
    const [temperature, setTemperature] = useState<WeatherData | null>(null);
    const { lat, lon} = useStore();


   

  useEffect(() => {
    const fetchSunTimes = async () => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`);

      const data = await res.json();
      setTemperature(data);
    };

    fetchSunTimes();
  }, []);
  const temp = temperature?.main?.temp ? kelvinToCelsius(temperature.main.temp) : null;
  const minTemp = temperature?.main?.temp_min ? kelvinToCelsius(temperature.main.temp_min) : null;
  const maxTemp = temperature?.main?.temp_max ? kelvinToCelsius(temperature.main.temp_max) : null;

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const weatherMain = temperature?.weather?.[0]?.main;
 const description = temperature?.weather?.[0]?.description;


  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timezoneOffset = temperature?.timezone ? temperature.timezone / 60 : 0;  
      const localMoment = moment().utcOffset(timezoneOffset);
  
      const formatedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");
  
      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [temperature?.timezone]);

  if (!temperature) {
    return <div>Loading...</div>;
  }
  

  return (
    <div
      className="pt-6  pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{temperature?.name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
