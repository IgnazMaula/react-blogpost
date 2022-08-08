export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export interface Author {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Photo {
    id: number;
    url: string;
}

export interface Comment {
    id?: number;
    name: string;
    email: string;
    body: string;
}

// Author Details Interface

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Geo {
    lat: string;
    lng: string;
}
