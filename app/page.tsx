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
  const { lat, lon } = useStore();

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-36">
          <div className="w-full md:w-1/4 h-full flex flex-col gap-y-2 ">
            <Map key={`${lat}-${lon}`} latitude={lat} longitude={lon} />
            <div>
              <FiveDayForecast key={`${lat}-${lon}`}/>
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full md:w-3/4">
          <div>
            <Visibility key={`${lat}-${lon}`}/>
          </div>
          <div>
            <Humidity key={`${lat}-${lon}`}/>
          </div>
          <div>
            <Pressure key={`${lat}-${lon}`}/>
          </div>
          <div>
            <UvIndex key={`${lat}-${lon}`}/>
          </div>
          <div className="">
            <Sun key={`${lat}-${lon}`} />
          </div>
          <div>
            <Wind  key={`${lat}-${lon}`}/>
          </div>
          <div>
            <AirPollution key={`${lat}-${lon}`}/>
          </div>
          <div>
            <FeelsLike key={`${lat}-${lon}`}/>
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
