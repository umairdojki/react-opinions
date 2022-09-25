type RatingValue =
    '0' | '1' | '2' | '3' | '4' | '5' |
    'Pass' | 'ImprovementRequired' | 'AwaitingPublication' | 'AwatingInspection' | 'Exempt';

type Establishment = {
    readonly id: number;
    readonly name: string;
    readonly ratingValue: RatingValue;
};

export type { Establishment, RatingValue };
