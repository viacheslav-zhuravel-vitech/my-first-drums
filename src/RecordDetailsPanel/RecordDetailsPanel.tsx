import {type FC, Fragment, useMemo} from "react";
import panelStyles from "../RecordingPanel/RecordingPanel.module.scss";
import recordingStyles from './RecordDetailsPanel.module.scss'
import {useDrums} from "../useDrums.tsx";
import {FaPlay} from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import cx from "classnames";

export const RecordDetailsPanel: FC = () => {
  const {selectedTrack, playTrack, editDelay, tracks} = useDrums()

  const selectedTrackWasEdited = useMemo(() => {
    const originalTrack = tracks.find(track => track.name === selectedTrack?.name)
    return JSON.stringify(originalTrack) !== JSON.stringify(selectedTrack)
  },[selectedTrack, tracks])

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
                onChange={({target: {value}}) => editDelay(index, +value)}
                value={recordedDrum.timestamp - selectedTrack.record[index - 1].timestamp}
                className={recordingStyles.timeout}>
              </input>
              ms
              <div className={recordingStyles.drumName}>{recordedDrum.id}</div>
            </Fragment>
          )
          return <div key={index} className={recordingStyles.drumName}>{recordedDrum.id}</div>
        })}
      </div>

    </section>
  )
}