import { ReactElement } from 'react';
import { Establishment } from 'src/shared/models/food-hygiene';

type EstablishmentListProps = {
    readonly establishments: Establishment[];
};

function EstablishmentList({ establishments }: EstablishmentListProps): ReactElement {
    return (
        <>
            {establishments &&
                establishments.map((establishment) => (
                    <div key={establishment.id}>
                        {establishment.name} - {establishment.ratingValue}
                    </div>
                ))}
        </>
    );
}

export { EstablishmentList };
