import { useEffect, useState } from 'react';

import { Clock } from 'src/shared/components';

import { getNearbyEstablishments } from 'src/shared/apis/food-hygiene-api';
import { getCurrentPosition } from 'src/shared/services';
import { Establishment } from 'src/shared/models/food-hygiene';

function App() {
    const [position, setPosition] = useState<GeolocationPosition | undefined>();
    const [positionError, setPositionError] = useState<Error | undefined>();

    const [establishments, setEstablishments] = useState<readonly Establishment[] | undefined>();
    const [establishmentsError, setEstablishmentsError] = useState<Error | undefined>();

    useEffect(() => {
        const getCurrentLocationAsync = async () => {
            try {
                setPosition(await getCurrentPosition());
            } catch (error) {
                setPositionError(error as Error);
            }
        }

        getCurrentLocationAsync();
    }, []);

    useEffect(() => {
        const getNearbyEstablishmentsAsync = async () => {
            if (!position) {
                setEstablishments([]);
                return;
            }

            try {
                const { latitude, longitude } = position.coords;

                const { establishments } = await getNearbyEstablishments({
                    latitude,
                    longitude,
                });

                setEstablishments(establishments);
            } catch (error) {
                console.error(error);
                setEstablishmentsError(error as Error);
            }
        }

        getNearbyEstablishmentsAsync();
    }, [position]);

    return (
        <>
            <Clock />

            {positionError && positionError.message}

            {establishments && establishments.slice(0, 10).map(establishment => {
                return <div key={establishment.id}>{establishment.name}</div>
            })}

            {establishmentsError && establishmentsError.message}
        </>
    );
}

export { App };
