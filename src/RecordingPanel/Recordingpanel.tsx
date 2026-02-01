import type {FC} from "react";
import type {Track} from "../App.tsx";
import cx from "classnames";
import panelStyles from "./RecordingPanel.module.scss";

type RecordingPanelProps = {
  tracks: Array<Track>,
  toggleRecording: () => void,
  recordingInProgress: boolean,
}
export const RecordingPanel: FC<RecordingPanelProps> = ({tracks, toggleRecording, recordingInProgress}) => {
  return (
    <menu>
      <button onClick={toggleRecording} className={cx({[panelStyles.recordingInProgress]: recordingInProgress})}>
        <div/>
        REC
      </button>

      <span>Tracks:</span>
      <ul>
        {tracks.map(track => <li>{track.name}</li>)}
      </ul>
    </menu>
  )
}