import type {IUser} from "./IUser";

export interface IProduct {
    id: number;
    total_earnings: number;
    time_bought: number;
    is_published: boolean;
    main_image: string;
    images: string[];
    owner: IUser;
}