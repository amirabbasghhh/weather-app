"use client";
import Map from "@/components/Map";
import Sun from "../components/Sun";
import useStore from "@/lib/store";
import Temperature from "@/components/Temperature";
import AirPollution from "@/components/AirPollution";
import Wind from "@/components/Wind";
import Population from "@/components/Population";
import UvIndex from "@/components/uvIndex";
import Visibility from "@/components/Visibility";
import Humidity from "@/components/Humidity";
import Pressure from "@/components/Pressure";
import FeelsLike from "@/components/FeelsLike";
import FiveDayForecast from "@/components/FiveDayForcast";
const Home: React.FC = () => {
  const { lat, lon,error } = useStore();

  if(error){
    return(
      <p className="flex items-center justify-center mt-10 font-bold text-red-500"> Check your internet connection and try again</p>
    )
  }

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-36">
          <div className="w-full md:w-1/4 h-full flex flex-col gap-y-2 ">
            <Map key={`${lat}-${lon}`} latitude={lat} longitude={lon} />
            <div>
              <FiveDayForecast />
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full md:w-3/4">
          <div>
            <Visibility />
          </div>
          <div>
            <Humidity />
          </div>
          <div>
            <Pressure />
          </div>
          <div>
            <UvIndex />
          </div>
          <div className="">
            <Sun  />
          </div>
          <div>
            <Wind  />
          </div>
          <div>
            <AirPollution />
          </div>
          <div>
            <FeelsLike />
          </div>
          <div className="">
            <Temperature />
          </div>
          <div>
            <Population />
          </div>
        </div>
    </div>
  );
};
export default Home;
