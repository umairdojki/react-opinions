import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

function getFormattedTime(): string {
    return dayjs(Date.now()).format('HH:mm:ss');
}

function App() {
    const [currentTime, setCurrentTime] = useState(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        return () => clearInterval(intervalId);
    });

    return <div>{currentTime}</div>;
}

export default App;
