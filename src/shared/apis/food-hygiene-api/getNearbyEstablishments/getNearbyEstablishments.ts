import { EstablishmentResource } from 'src/shared/apis/food-hygiene-api/resources';
import { Establishment, RatingValue } from 'src/shared/models/food-hygiene';

type GetNearbyEstablishmentsRequest = {
    readonly latitude: number;
    readonly longitude: number;
}

type GetNearbyEstablishmentsResponse = {
    readonly establishments: readonly Establishment[];
}

const toModel = (response: Array<EstablishmentResource>): readonly Establishment[] => {
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

    const takeawayBusinessTypeId = 7844; // Takeaway / sandwich shop

    const queryString = new URLSearchParams([
        ['latitude', String(latitude)],
        ['longitude', String(longitude)],
        ['businessTypeId', String(takeawayBusinessTypeId)],
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
        establishments: toModel(establishments)
    }
}

export { getNearbyEstablishments };
