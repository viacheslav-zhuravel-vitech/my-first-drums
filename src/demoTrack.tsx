import type {Track} from "./useDrums.tsx";

const startTime = Date.now();

export const demoRockTrack: Track = {
  name: "Demo",
  record: [
    {id: 'kick', timestamp: startTime},
    {id: 'boom', timestamp: startTime},
    {id: 'hihat', timestamp: startTime + 250},
    {id: 'snare', timestamp: startTime + 500},
    {id: 'hihat', timestamp: startTime + 750},
    {id: 'kick', timestamp: startTime + 1000},
    {id: 'hihat', timestamp: startTime + 1000},
    {id: 'hihat', timestamp: startTime + 1100},
    {id: 'hihat', timestamp: startTime + 1200},
    {id: 'hihat', timestamp: startTime + 1300},
    {id: 'snare', timestamp: startTime + 1500},
    {id: 'kick', timestamp: startTime + 1750},
    {id: 'kick', timestamp: startTime + 1850},
    {id: 'openhat', timestamp: startTime + 2000},
  ]
};