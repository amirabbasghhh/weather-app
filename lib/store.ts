import { create } from "zustand";

interface Store {
  lat: number;
  lon: number;
  error: string;
  setError: (error: string) => void;
  setLatLon: (lat: number, lon: number) => void; 
}

const useStore = create<Store>((set) => ({
  error: "",
  lat: 35.6895, 
  lon: 51.3890,
  setError: (error: string) => set(() => ({ error })),
  setLatLon: (lat, lon) => set(() => ({ lat, lon })), 
}));

export default useStore;
