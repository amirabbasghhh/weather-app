"use client";
import Map from "@/components/Map";
import Sun from "../components/Sun";
import useStore from "@/lib/store";
import { useEffect } from "react";
import Temperature from "@/components/Temperature";
import AirPollution from "@/components/AirPollution";
const Home: React.FC = () => {
  const { lat, lon } = useStore();
 

  return (
    <div className="grid grid-cols-4 pb-24 gap-4 ">
      <div className="w-full">
        <Map key={`${lat}-${lon}`} latitude={lat} longitude={lon} />
      </div>
      <div className="">
        <Sun key={`${lat}-${lon}`} />
      </div>
      <div className="">
        <Temperature key={`${lat}-${lon}`}/>
      </div>
      <div>
        <AirPollution key={`${lat}-${lon}`}/>
      </div>
    </div>
  );
};
export default Home;
