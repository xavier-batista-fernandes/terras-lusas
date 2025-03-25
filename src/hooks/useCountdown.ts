import { useRef, useState } from 'react';

export enum CountdownUpdates {
    START,
    RESET,
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
                    if (elapsedTime >= duration * 1000) {
                        callback();
                        // setRemainingTime(duration);
                        clearInterval(interval.current);
                    }
                    setRemainingTime(duration - Math.floor(elapsedTime / 1000));

                }, 500);
                break;

            case CountdownUpdates.RESET:
                console.log('RESETTING TIMER', duration);
                setRemainingTime(duration);
                clearInterval(interval.current);
                break;
        }
    }

    return { remainingTime, updateState };
}