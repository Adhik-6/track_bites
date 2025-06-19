import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Preference, TrainDetails } from '../pages';

const useGlobalStore = create(
  persist(
    (set) => ({
      userData: null,
      setUser: (user) => set({ userData: user }),

      token: "",
      setToken: (tkn) => set({ token: tkn}),

      stations: [
        { zone: "Chennai Zone", station: "MGR Chennai Central" },
        { zone: "Mumbai Zone", station: "Chhatrapati Shivaji Maharaj Terminus" },
        { zone: "Bangalore Zone", station: "KSR Bengaluru" },
        { zone: "Delhi Zone", station: "New Delhi Railway Station" },
        { zone: "Kolkata Zone", station: "Howrah Junction" },
        { zone: "Hyderabad Zone", station: "Secunderabad Junction" },
        { zone: "Ahmedabad Zone", station: "Ahmedabad Junction" },
        { zone: "Pune Zone", station: "Pune Junction" },
        { zone: "Jaipur Zone", station: "Jaipur Junction" },
      ],
      location: null,
      setLocation: (idx) => set({ location: idx }),

      categories: ["Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"],
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      preference: null,
      setPreference: (pref) => set({ preference: pref }),

      selectedItems: [],
      setSelectedItems: (value, checked) => set((state) => {
        if (checked) {
          return { selectedItems: [...state.selectedItems, value] };
        } else {
          return { selectedItems: state.selectedItems.filter((item) => item !== value) };
        }
      }),

      trainDetails: null,
      setTrainDetails: (details) => set({ trainDetails: details }),

      resetAll: () => set({
        userData: null,
        token: "",
        location: null,
        selectedCategory: null,
        preference: null,
        trainDetails: null,
        selectedItems: [],
      }),
      clearSelectedItems: () => set({ selectedItems: [] }),
    }),
    {
      name: 'global-store',
      getStorage: () => sessionStorage, 
    }
  )
);

export default useGlobalStore;