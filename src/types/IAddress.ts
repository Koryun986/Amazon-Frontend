export interface IAddress {
    id: number;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
    is_default_address: boolean;
}