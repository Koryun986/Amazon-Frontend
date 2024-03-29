import type {IUser} from "./IUser";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: {
        name: string;
    };
    color: {
        name: string;
    };
    size: {
        name: string;
    };
    total_earnings: number;
    time_bought: number;
    is_published: boolean;
    images: {
        image_url: string;
        is_main_image: boolean;
    }[];
    owner: IUser;
}