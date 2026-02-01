import styles from "./App.module.scss";
import {Drum} from "./Drum/Drum.tsx";
import boom from './assets/drums/boom.wav'
import clap from './assets/drums/clap.wav'
import hihat from './assets/drums/hihat.wav'
import kick from './assets/drums/kick.wav'
import openhat from './assets/drums/openhat.wav'
import ride from './assets/drums/ride.wav'
import snare from './assets/drums/snare.wav'
import tink from './assets/drums/tink.wav'
import tom from './assets/drums/tom.wav'
import {useCallback, useMemo, useState} from "react";
import {Header} from "./Header/Header.tsx";
import {RecordingPanel} from "./RecordingPanel/Recordingpanel.tsx";


export type RecordedDrum  = {
  id: string,
  timestamp: Date,
}

export type Track = {
  name: string,
  record: Array<RecordedDrum>
}

export type Drum = {
  id: string;
  size: 'big' | 'small';
  top?: string;
  left?: string;
  audioUrl: string;
  button: string;
  keyCode: string;
}

function App() {

  const [tracks, setTracks] = useState<Array<Track>| []>([]);
  const [recordingInProgress, setRecordingInProgress] = useState<boolean>(false)
  const [newRecord, setNewRecord] = useState<Array<RecordedDrum> | []>([])

  const toggleRecording = useCallback(() => {
    if (recordingInProgress) {
      setRecordingInProgress(false)
      if(newRecord.length) {
        setTracks(prevState => [...prevState, {name : `Track ${prevState.length +1}`, record: newRecord }])
        setNewRecord([])
      }
    } else {
      setRecordingInProgress(true)
    }
  }, [newRecord, recordingInProgress]);

  const recordDrum = useCallback( (newDrum: RecordedDrum) => {
    setNewRecord(prevState => [...prevState, newDrum])
  },[])

  const drums: Array<Drum> = useMemo(() => [
      {
        id: 'boom',
        button: 'Space',
        keyCode: 'Space',
        audioUrl: boom,
        size: 'big',
        top: '867px',
        left: '470px'
      },
      {
        id: 'clap',
        button: 'A',
        keyCode: 'KeyA',
        audioUrl: clap,
        size: 'big',
        top: '385px',
        left: '226px'
      },
      {
        id: 'hihat',
        button: 'S',
        keyCode: 'KeyS',
        audioUrl: hihat,
        size: 'small',
        top: '620px',
        left: '155px'
      },
      {
        id: 'openhat',
        button: 'D',
        keyCode: 'KeyD',
        audioUrl: openhat,
        size: 'small',
        top: '620px',
        left: '255px'

      },
      {
        id: 'kick',
        button: 'G',
        keyCode: 'KeyG',
        audioUrl: kick,
        size: 'big',
        top: '500px',
        left: '340px'
      },
      {
        id: 'tink',
        button: 'H',
        keyCode: 'KeyH',
        audioUrl: tink,
        size: 'big',
        top: '490px',
        left: '500px'
      },
      {
        id: 'ride',
        button: 'L',
        keyCode: 'KeyL',
        audioUrl: ride,
        size: 'big',
        top: '403px',
        left: '672px'
      },
      {
        id: 'snare',
        button: 'F',
        keyCode: 'KeyF',
        audioUrl: snare,
        size: "big",
        top: '669px',
        left: '365px'
      },
      {
        id: 'tom',
        button: 'K',
        keyCode: 'KeyK',
        audioUrl: tom,
        size: "big",
        top: '670px',
        left: '670px'
      }
    ]
    , [])

  return (
    <main className={styles.page}>
      <Header/>
      <RecordingPanel tracks={tracks} toggleRecording={toggleRecording} recordingInProgress={recordingInProgress}/>
      <div className={styles['drums-view']}>
        {drums.map((drum) => (
          <Drum id={drum.id} size={drum.size} audioUrl={drum.audioUrl} button={drum.button}
                keyCode={drum.keyCode} top={drum.top} left={drum.left} recordDrum={recordDrum} recordingInProgress={recordingInProgress}/>
        ))}
      </div>
    </main>
  )
}

export default App
