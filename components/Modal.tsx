"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { SearchIcon } from "./icons";
import { useEffect, useState } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export default function ModalComponent({
  isOpen,
  onOpenChange,
}: ModalComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const defaultCities = ["London", "Sydney", "New York", "Paris", "Madrid"];

  // تابع گرفتن داده‌ی یک شهر
  const fetchCityData = async (query: string): Promise<City[]> => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=8486523fa169c0048a96e2ccb9a079ff`
    );
    return await res.json();
  };

  // گرفتن لیست کامل شهرهای پیش‌فرض
  const fetchDefaultCities = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        defaultCities.map((city) => fetchCityData(city))
      );
      // چون هر نتیجه ممکنه آرایه باشه، همه را فلت می‌کنیم
      const flattened = results.flat();
      setCities(flattened);
    } catch (error) {
      console.error("Error fetching default cities:", error);
    } finally {
      setLoading(false);
    }
  };

  // نمایش پیش‌فرض شهرها هنگام باز شدن
  useEffect(() => {
    if (isOpen) {
      setCities([]);
      fetchDefaultCities();
    }
  }, [isOpen]);

  // ریست کردن مقادیر وقتی modal بسته میشه
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCities([]);
    }
  }, [isOpen]);

  // جستجو بر اساس searchQuery یا نمایش پیش‌فرض در صورت خالی بودن
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchDefaultCities();
        return;
      }

      const fetchSearchResult = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=10&appid=8486523fa169c0048a96e2ccb9a079ff`
          );
          const data = await res.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResult();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <Modal
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex  flex-col gap-1 border-b ">
          <div className="flex items-center bg-white  w-full ">
            <SearchIcon />
            <input
              placeholder="Search for a city..."
              className="bg-white text-gray-500 w-full ml-5 border-none focus:ring-0 focus:border-none focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </ModalHeader>

        <ModalBody>
            <p className="text-gray-500 px-2">suggestion</p>
          {loading && <p className="text-sm text-gray-500 px-2">Loading...</p>}
          {!loading && cities.length === 0 && searchQuery && (
            <p className="text-sm text-gray-400 text-center">No cities found.</p>
          )}
          <ul className="">
            {cities.map((city, index) => (
              <li key={index} className="p-2 rounded-lg hover:bg-gray-100">
                <strong>{city.name}</strong>, {city.state && `${city.state}, `}
                {city.country} <br />
                {/* <span className="text-xs text-gray-500">
                  lat: {city.lat}, lon: {city.lon}
                </span> */}
              </li>
            ))}
          </ul>
        </ModalBody>

        {/* <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button color="primary" onPress={() => onOpenChange(false)}>
            Done
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
