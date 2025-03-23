import { useRef, useState } from 'react';

export enum CountdownUpdates {
    START,
    STOP,
}

export function useCountdown(duration: number, callback: () => void) {
    const [remainingTime, setRemainingTime] = useState(duration);
    const interval = useRef<number>(0);

    function updateState(update: CountdownUpdates) {
        switch (update) {
            case CountdownUpdates.START:
                const startTime = new Date().getTime();
                interval.current = setInterval(() => {
                    const elapsedTime = new Date().getTime() - startTime;
                    if (elapsedTime > duration * 1000) {
                        callback();
                        clearInterval(interval.current);
                    }
                    setRemainingTime(duration - Math.floor(elapsedTime / 1000));

                }, 500);
                break;

            case CountdownUpdates.STOP:
                clearInterval(interval.current);
                setRemainingTime(duration);
                break;
        }
    }

    return { remainingTime, updateState };
}