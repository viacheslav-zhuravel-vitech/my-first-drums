import {create} from "zustand/react";
import boom from "./assets/drums/boom.wav";
import clap from "./assets/drums/clap.wav";
import hihat from "./assets/drums/hihat.wav";
import openhat from "./assets/drums/openhat.wav";
import kick from "./assets/drums/kick.wav";
import tink from "./assets/drums/tink.wav";
import ride from "./assets/drums/ride.wav";
import snare from "./assets/drums/snare.wav";
import tom from "./assets/drums/tom.wav";
import {demoRockTrack} from "./demoTrack.tsx";
import {persist} from "zustand/middleware";

export type Drum = {
  id: string;
  size: 'big' | 'small';
  top?: string;
  left?: string;
  audioUrl: string;
  button: string;
  keyCode: string;
  animationInProgress: boolean;
}

type Store = {
  drums: Array<Drum>
  tracks: Array<Track> | [],
  recordingInProgress: boolean,
  newRecord: Array<RecordedDrum> | [],
  waitMode: boolean,
  selectedTrack: Track | null,

  toggleRecording: () => void,
  recordDrum: (newDrum: RecordedDrum) => void,
  runInteractionAnimationForDrum: (drumId: string) => void,
  playDrum: (drumId: string) => void,
  playTrack: (track: Track, drumIndex?: number) => void,
  selectTrack: (track: Track) => void,
  editDelay: (index: number, newDelay: number) => void,
  editDrum: (index: number, drumId: string) => void
}

export type RecordedDrum = {
  id: string,
  timestamp: number,
}

export type Track = {
  name: string,
  record: Array<RecordedDrum>
}

export const useDrums = create<Store>()(persist((set, get) => ({
  drums: [
    {
      id: 'boom',
      button: 'Space',
      keyCode: 'Space',
      audioUrl: boom,
      size: 'big',
      top: '867px',
      left: '470px',
      animationInProgress: false
    },
    {
      id: 'clap',
      button: 'A',
      keyCode: 'KeyA',
      audioUrl: clap,
      size: 'big',
      top: '385px',
      left: '226px',
      animationInProgress: false
    },
    {
      id: 'hihat',
      button: 'S',
      keyCode: 'KeyS',
      audioUrl: hihat,
      size: 'small',
      top: '620px',
      left: '155px',
      animationInProgress: false
    },
    {
      id: 'openhat',
      button: 'D',
      keyCode: 'KeyD',
      audioUrl: openhat,
      size: 'small',
      top: '620px',
      left: '255px',
      animationInProgress: false
    },
    {
      id: 'kick',
      button: 'G',
      keyCode: 'KeyG',
      audioUrl: kick,
      size: 'big',
      top: '500px',
      left: '340px',
      animationInProgress: false
    },
    {
      id: 'tink',
      button: 'H',
      keyCode: 'KeyH',
      audioUrl: tink,
      size: 'big',
      top: '490px',
      left: '500px',
      animationInProgress: false
    },
    {
      id: 'ride',
      button: 'L',
      keyCode: 'KeyL',
      audioUrl: ride,
      size: 'big',
      top: '403px',
      left: '672px',
      animationInProgress: false
    },
    {
      id: 'snare',
      button: 'F',
      keyCode: 'KeyF',
      audioUrl: snare,
      size: "big",
      top: '669px',
      left: '365px',
      animationInProgress: false
    },
    {
      id: 'tom',
      button: 'K',
      keyCode: 'KeyK',
      audioUrl: tom,
      size: "big",
      top: '670px',
      left: '670px',
      animationInProgress: false
    }
  ],
  tracks: [demoRockTrack],
  recordingInProgress: false,
  newRecord: [],
  waitMode: false,
  selectedTrack: null,

  toggleRecording: () => {
    const {recordingInProgress, newRecord} = get()
    if (recordingInProgress) {
      set({recordingInProgress: false})
      if (newRecord.length) {
        set(prevState => ({
          tracks: [...prevState.tracks, {
            name: `Track ${prevState.tracks.length + 1}`,
            record: newRecord
          }], newRecord: []
        }));
      }
    } else {
      set({recordingInProgress: true})
    }
  },
  recordDrum: (newDrum) => {
    set(prevState => ({newRecord: [...prevState.newRecord, newDrum]}))
  },
  runInteractionAnimationForDrum: (drumId) => {
    set(prevState => {
      const updatedDrums = prevState.drums.map(drum => drum.id === drumId ? {...drum, animationInProgress: true} : drum)
      return {drums: updatedDrums}
    })
    setTimeout(() => {
      set(prevState => {
        const updatedDrums = prevState.drums.map(drum => drum.id === drumId ? {
          ...drum,
          animationInProgress: false
        } : drum)
        return {drums: updatedDrums}
      })
    }, 300)
  },
  playDrum: (drumId) => {
    const {runInteractionAnimationForDrum, recordingInProgress, recordDrum, drums} = get()

    runInteractionAnimationForDrum(drumId)
    if (recordingInProgress) recordDrum({id: drumId, timestamp: Date.now()})
    const audio = new Audio(drums.find(drum => drum.id === drumId)?.audioUrl)
    audio.play()
  },
  playTrack: async (track) => {
    const {playDrum} = get();

    for (let i = 0; i < track.record.length; i++) {
      const current = track.record[i];
      const prev = track.record[i - 1];

      if (prev) {
        const delay = current.timestamp - prev.timestamp;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      playDrum(current.id);
    }
  },
  selectTrack: (track) => {
    set({selectedTrack: track})
  },
  editDelay: (index, newValue) => {
    const {selectedTrack} = get()
    if (!selectedTrack?.record) return;
    const prevValue = selectedTrack.record[index].timestamp-selectedTrack.record[index-1].timestamp
    const diff = newValue - prevValue;
    const updatedRecord = selectedTrack.record.map((drum: RecordedDrum, i: number) => i >= index ? {...drum, timestamp: drum.timestamp + diff} : drum)
    set({selectedTrack: {...selectedTrack, record: updatedRecord}})
  },
  editDrum: (index, drumId) => {
    const {selectedTrack} = get()
    if (!selectedTrack?.record) return;
    const updatedRecord = selectedTrack.record.map((drum: RecordedDrum, i: number) => i === index ? {...drum, id: drumId} : drum)
    set({selectedTrack: {...selectedTrack, record: updatedRecord}})
  }
}), {name: 'drums-store'}))