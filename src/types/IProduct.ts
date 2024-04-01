import type {IUser} from "./IUser";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: {
        id: number
        name: string;
    };
    colors: {
        id: number;
        name: string;
    }[];
    sizes: {
        id: number;
        name: string;
    }[];
    total_earnings: number;
    time_bought: number;
    is_published: boolean;
    images: {
        image_url: string;
        id: number;
    }[];
    main_image: {
        image_url: string;
    }
    owner: IUser;
}