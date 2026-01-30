import {type FC, useCallback, useEffect, useState} from "react";
import drum from './Drum.module.scss'
import cx from "classnames";

export type Drum = {
    id: string;
    size: 'big'|'small';
    top?: string;
    left?: string;
    audioUrl: string;
    button: string;
    keyCode: string;
}

export const Drum: FC<Drum> = ({ size, button, keyCode, audioUrl, top, left }) => {
    const [animation, setAnimation] = useState<boolean>(false)
    const runInteractionAnimation = () => {
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
        }, 300)
    }
    const playDram = useCallback(() => {
        runInteractionAnimation()
        const audio = new Audio(audioUrl)
        audio.play()
    },[audioUrl])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.code === keyCode) {
                playDram()
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [keyCode, playDram])

    return (
        <div
            className={cx(drum.drum, drum[size], { [drum['drum-animated-wait']]: false, [drum['drum-animated-interaction']]: animation})}
            onClick={playDram}
            style={{top: top, left: left }}
        >
            {button}
        </div>
    )
}