"use client";
import Map from "@/components/Map";
import Sun from "../components/Sun";
import useStore from "@/lib/store";
import { useEffect } from "react";
import Temperature from "@/components/Temperature";
import AirPollution from "@/components/AirPollution";
import Wind from "@/components/Wind";
import Population from "@/components/Population";
const Home: React.FC = () => {
  const { lat, lon } = useStore();
 

  return (
    <div className="flex items-start justify-between gap-4 pb-36">
          <div className="w-1/4 h-full ">
            <Map key={`${lat}-${lon}`} latitude={lat} longitude={lon} />
            
          </div>

        <div className="grid grid-cols-3 gap-2 w-3/4">
          <div className="">
            <Sun key={`${lat}-${lon}`} />
          </div>
          <div>
            <Wind  key={`${lat}-${lon}`}/>
          </div>
          <div>
            <AirPollution key={`${lat}-${lon}`}/>
          </div>
          <div className="">
            <Temperature key={`${lat}-${lon}`}/>
          </div>
          <div>
            <Population key={`${lat}-${lon}`}/>
          </div>
        </div>
    </div>
  );
};
export default Home;
