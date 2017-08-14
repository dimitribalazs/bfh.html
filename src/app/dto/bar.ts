export class Bar {
    name: string;
    address: string;
    city: string;
    plz: string;
    rating: number;
    size: number;
    isSmokingAllowed: boolean;
    openingHours: string; //todo change
    snacks: string; //todo change
    geoDaten: GeoDaten;

    //beer
}

export class GeoDaten {
    longitude: number;
    latitude: number;
}