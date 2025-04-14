'use client';
import { unixToTime } from '@/app/utils/utils';
import useStore from '@/lib/store';
import { useEffect, useState } from 'react';
import { sunset } from '@/app/utils/Icons';
import { Skeleton } from '@heroui/react';

export default function Home() {
  const [sun, setSun] = useState<any>(null); // افزودن تایپ برای sun
  const { lat, lon } = useStore();
  
  useEffect(() => {
    const fetchSunTimes = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8486523fa169c0048a96e2ccb9a079ff`);
      const data = await res.json();
      setSun(data);
    };

    fetchSunTimes();
  }, [lat, lon]); // اضافه کردن dependecy به lat و lon

  // دسترسی به زمان‌ها
  const sunsetTime = sun?.sys?.sunset ? unixToTime(sun.sys.sunset, sun.timezone) : null;
  const sunriseTime = sun?.sys?.sunrise ? unixToTime(sun.sys.sunrise, sun.timezone) : null;
    if (!sun ) {
      return <Skeleton className=" w-full h-40 rounded-lg" />;
    }
  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col gap-y-5 h-full dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
            {sunset}
            Sunset
            </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise: {sunriseTime}</p>
    </div>
  );
}
