import {type FC, Fragment, useMemo} from "react";
import panelStyles from "../RecordingPanel/RecordingPanel.module.scss";
import recordingStyles from './RecordDetailsPanel.module.scss'
import {type RecordedDrum, useDrums} from "../useDrums.tsx";
import {FaPlay} from "react-icons/fa";
import {FaSave} from "react-icons/fa";
import cx from "classnames";

export const RecordDetailsPanel: FC = () => {
  const {selectedTrack, playTrack, editDelay, tracks} = useDrums()

  const selectedTrackWasEdited = useMemo(() => {
    const originalTrack = tracks.find(track => track.name === selectedTrack?.name)
    return JSON.stringify(originalTrack) !== JSON.stringify(selectedTrack)
  }, [selectedTrack, tracks])

  if (!selectedTrack) {
    return (
      <section className={panelStyles.panel}>
        <h2 className={recordingStyles.empty}>No track selected</h2>
      </section>
    )
  }
  return (
    <section className={panelStyles.panel}>
      <h2 className={recordingStyles.trackName}>{selectedTrack.name}</h2>
      <div className={recordingStyles.controls}>
        <FaPlay size="25px" onClick={() => playTrack(selectedTrack)}/>
        <FaSave className={cx({[recordingStyles.controlsDisabled]: !selectedTrackWasEdited})} size="25px"/>
      </div>
      <div className={recordingStyles.recordDetails}>
        {selectedTrack.record.map((recordedDrum, index) => {
          if (index) return (
            <Fragment key={index}>
              <input
                type="number"
                name="timout-input"
                onChange={({target: {value}}) => editDelay(index, +value)}
                value={recordedDrum.timestamp - selectedTrack.record[index - 1].timestamp}
                className={recordingStyles.timeout}>
              </input>
              ms
              <DrumSelector recordedDrum={recordedDrum} index={index}/>
            </Fragment>
          )
          return <DrumSelector key={index} recordedDrum={recordedDrum} index={index}/>
        })}
      </div>

    </section>
  )
}

const DrumSelector: FC<{recordedDrum: RecordedDrum, index: number}> = ({recordedDrum, index}) => {
  const {drums, editDrum} = useDrums()
  return (
    <select className={recordingStyles.drumSelector} value={recordedDrum.id}
            onChange={({target: {value}}) => editDrum(index, value)}>
      {drums.map((drum, index) => <option value={drum.id} key={drum.id + index}>{drum.id}</option>)}
    </select>
  )
}