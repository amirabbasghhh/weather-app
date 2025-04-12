import { create } from "zustand";

interface Store {
  lat: number;
  lon: number;
  setLatLon: (lat: number, lon: number) => void; 
}

const useStore = create<Store>((set) => ({
  lat: 35.6895, 
  lon: 51.3890,
  setLatLon: (lat, lon) => set(() => ({ lat, lon })), 
}));

export default useStore;
