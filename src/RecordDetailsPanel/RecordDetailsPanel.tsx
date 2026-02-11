import {type FC, Fragment} from "react";
import panelStyles from "../RecordingPanel/RecordingPanel.module.scss";
import recordingStyles from './RecordDetailsPanel.module.scss'
import {useDrums} from "../useDrums.tsx";

export const RecordDetailsPanel: FC = () => {
  const {selectedTrack} = useDrums()
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
      <div className={recordingStyles.recordDetails}>
        {selectedTrack.record.map((recordedDrum, index) => {
          if (index) return (
            <Fragment key={index}>
              <div
                className={recordingStyles.timeout}>{+recordedDrum.timestamp - +selectedTrack.record[index - 1].timestamp} ms
              </div>
              <div className={recordingStyles.drumName}>{recordedDrum.id}</div>
            </Fragment>
          )
          return <div key={index} className={recordingStyles.drumName}>{recordedDrum.id}</div>
        })}
      </div>

    </section>
  )
}