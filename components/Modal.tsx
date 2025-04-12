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

  useEffect(() => {
    const fetchCities = async () => {
      if (!searchQuery.trim()) {
        setCities([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=10&appid=8486523fa169c0048a96e2ccb9a079ff`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCities();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCities([]);
    }
  }, [isOpen]);

  return (
    <Modal
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex mt-4 flex-col gap-1">
          <div className="flex items-center bg-white border rounded-lg w-full p-2">
            <SearchIcon />
            <input
              placeholder="Search for a city..."
              className="bg-white w-full ml-3 border-none focus:ring-0 focus:border-none focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </ModalHeader>

        <ModalBody>
            <p className="text-gray-500">suggestion</p>
          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          {!loading && cities.length === 0 && searchQuery && (
            <p className="text-sm text-gray-400">No cities found.</p>
          )}
          <ul className="">
            {cities.map((city, index) => (
              <li key={index} className="p-1.5 rounded-lg hover:bg-gray-200">
                <strong>{city.name}</strong>, {city.state && `${city.state}, `}
                {city.country} <br />
                <span className="text-xs text-gray-500">
                  lat: {city.lat}, lon: {city.lon}
                </span>
              </li>
            ))}
          </ul>
        </ModalBody>

        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
