import { faker } from '@faker-js/faker';

import { getCurrentPosition } from 'src/shared/services';

import { getNearbyEstablishments } from 'src/shared/apis/food-hygiene-api';
import { Establishment } from 'src/shared/models/food-hygiene';

function shuffleTop10(establishments: Establishment[]) {
    return faker.helpers
        .shuffle(establishments)
        .slice(0, 10);
}

async function getRandomLunchEstablishments(): Promise<Establishment[]> {
    try {
        const position = await getCurrentPosition();

        const { latitude, longitude } = position.coords;

        const { establishments } = await getNearbyEstablishments({
            latitude,
            longitude
        });

        return shuffleTop10(establishments);

    } catch (error) {
        throw new Error('Failed to get ')
    }
}

export { getRandomLunchEstablishments };
