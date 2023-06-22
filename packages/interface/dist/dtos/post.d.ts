import { IPostCategoryDTO } from "./category";
export interface IPostDTO {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    category: IPostCategoryDTO;
}
export interface ICreatePostDTO {
    title: string;
    content: string;
    categoryId: number;
}
