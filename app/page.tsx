"use client";
import Map from "@/components/Map";
import Sun from "../components/Sun";
import useStore from "@/lib/store";
import { useEffect } from "react";
import Temperature from "@/components/Temperature";
const Home: React.FC = () => {
  const { lat, lon } = useStore();
 

  return (
    <div className="grid grid-cols-3 gap-4 py-20">
      <div className="w-full">
        <Map key={`${lat}-${lon}`} latitude={lat} longitude={lon} />
      </div>
      <div className="">
        <Sun key={`${lat}-${lon}`} />
      </div>
      <div className="">
        <Temperature key={`${lat}-${lon}`}/>
      </div>
    </div>
  );
};
export default Home;
