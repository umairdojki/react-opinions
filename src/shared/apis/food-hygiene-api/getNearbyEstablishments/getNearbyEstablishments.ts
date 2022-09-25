import { faker } from '@faker-js/faker';

import { EstablishmentResource } from 'src/shared/apis/food-hygiene-api/resources';
import { Establishment, RatingValue } from 'src/shared/models/food-hygiene';

type GetNearbyEstablishmentsRequest = {
    readonly latitude: number;
    readonly longitude: number;
}

type GetNearbyEstablishmentsResponse = {
    readonly establishments: readonly Establishment[];
}

function toModel(response: Array<EstablishmentResource>): Establishment[] {
    const establishments = response
        .map((establishment) => ({
            id: establishment.FHRSID,
            name: establishment.BusinessName,
            ratingValue: establishment.RatingValue as RatingValue,
        }));

    return faker.helpers
        .shuffle(establishments)
        .slice(0, 10);
};

function shuffleTop10(establishments: Establishment[]) {
    return faker.helpers
        .shuffle(establishments)
        .slice(0, 10);
}

async function getNearbyEstablishments({ latitude, longitude }: GetNearbyEstablishmentsRequest): Promise<GetNearbyEstablishmentsResponse> {
    const baseUrl = 'https://api.ratings.food.gov.uk';

    const takeawayBusinessTypeId = 7844; // Takeaway / sandwich shop
    const milesAway = 1;

    const queryString = new URLSearchParams([
        ['latitude', String(latitude)],
        ['longitude', String(longitude)],
        ['businessTypeId', String(takeawayBusinessTypeId)],
        ['maxDistanceLimit', String(milesAway)],
    ]).toString();

    const url = `${baseUrl}/Establishments?${queryString}`;

    const options: RequestInit = {
        headers: {
            'accept': 'application/json',
            'x-api-version': '2',
        },
    };

    const result = await fetch(url, options);
    const { status } = result;

    if (status !== 200) {
        throw new Error(`Failed to get nearby establishments (${status})`);
    }

    const response = await result.json();
    const { establishments } = response;

    return {
        establishments: shuffleTop10(toModel(establishments)),
    }
}

export { getNearbyEstablishments };
