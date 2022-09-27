import { ReactElement, useEffect, useState } from 'react';

import dayjs from 'dayjs';

function getFormattedTime(): string {
    return dayjs(Date.now()).format('HH:mm:ss');
}

function Clock(): ReactElement {
    const [currentTime, setCurrentTime] = useState(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        // eslint-disable-next-line no-console
        console.log('clock');

        return () => clearInterval(intervalId);
    }, []);

    return <div>{currentTime}</div>;
}

export { Clock };
