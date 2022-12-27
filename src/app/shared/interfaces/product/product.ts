import { ICategoryResponse } from "../category/category";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    imagePath: string;
    description: string;
    price: number;
    weight: number;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}
