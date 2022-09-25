import { EstablishmentResource } from 'src/shared/apis/food-hygiene-api/resources';
import { Establishment, RatingValue } from 'src/shared/models/food-hygiene';

type GetNearbyEstablishmentsRequest = {
    readonly latitude: number;
    readonly longitude: number;
}

type GetNearbyEstablishmentsResponse = {
    readonly establishments: Establishment[];
}

function toModel(response: Array<EstablishmentResource>): Establishment[] {
    const establishments = response
        .map((establishment) => ({
            id: establishment.FHRSID,
            name: establishment.BusinessName,
            ratingValue: establishment.RatingValue as RatingValue,
        }));

    return establishments;
};

async function getNearbyEstablishments({ latitude, longitude }: GetNearbyEstablishmentsRequest): Promise<GetNearbyEstablishmentsResponse> {
    const baseUrl = 'https://api.ratings.food.gov.uk';

    const businessTypeId = 7844; // Takeaways and sandwich shops
    const milesAway = 1;

    const queryString = new URLSearchParams([
        ['latitude', String(latitude)],
        ['longitude', String(longitude)],
        ['businessTypeId', String(businessTypeId)],
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
        establishments: toModel(establishments),
    }
}

export { getNearbyEstablishments };
