import create from "zustand";

export const useStore = create((set) => ({
  socket: null,
  sensors: [],
  setSocket: (socket) => {
    set(() => ({
      socket,
    }));
  },
  setSensors: (sensors) => {
    if (sensors.length === 0) return;
    set(() => ({
      sensors,
    }));
  },
}));
