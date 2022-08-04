export interface ICategoryRequest {
    name: string;
    road: string;
    imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequest {
    id: number;
}
