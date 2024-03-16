import type {IUser} from "./IUser";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: string;
    color: string;
    size: string;
    total_earnings: number;
    time_bought: number;
    is_published: boolean;
    main_image: string;
    images: string[];
    owner: IUser;
}