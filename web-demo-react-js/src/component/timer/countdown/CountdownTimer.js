import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ seconds, restart }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(seconds);
    const [color, setColor] = useState("black");
    const timerRef = useRef();

    useEffect(() => {
        clearInterval(timerRef.current); // Clear previous timer
        setRemainingSeconds(seconds); // Reset remainingSeconds to the initial value
        setColor("black"); // Reset color to black

        timerRef.current = setInterval(() => {
            setRemainingSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                if (prevSeconds <= 21) {
                    setColor("red");
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [seconds, restart]); // Trigger effect when seconds or restart changes

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <span style={{ color: color }}>{formatTime(remainingSeconds)}</span>
    );
};

export default CountdownTimer;
