import {type FC, useCallback, useEffect, useState} from "react";
import drum from './Drum.module.scss'
import cx from "classnames";
import type {Drum as DrumType} from "../App.tsx";
import type {RecordedDrum} from "../App.tsx";

type DrumProps = DrumType & { recordDrum: (newDrum: RecordedDrum) => void, recordingInProgress: boolean };

export const Drum: FC<DrumProps> = (
  {
    id,
    size,
    button,
    keyCode,
    audioUrl,
    top,
    left,
    recordDrum,
    recordingInProgress
  }
) => {
  const [animation, setAnimation] = useState<boolean>(false)

  const runInteractionAnimation = useCallback(() => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
    }, 300)
  }, []);

  const playDram = useCallback(() => {
    runInteractionAnimation()
    if (recordingInProgress) recordDrum({id: id, timestamp: new Date()})
    const audio = new Audio(audioUrl)
    audio.play()
  }, [audioUrl, id, recordDrum, recordingInProgress, runInteractionAnimation])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === keyCode) {
        playDram()
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCode, playDram])

  return (
    <div
      className={cx(drum.drum, drum[size], {
        [drum['drum-animated-wait']]: false,
        [drum['drum-animated-interaction']]: animation
      })}
      onClick={playDram}
      style={{top: top, left: left}}
    >
      {button}
    </div>
  )
}