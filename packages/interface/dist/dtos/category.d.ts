export interface IPostCategoryDTO {
	id: number;
	name: string;
	postCount: number;
	createdAt: Date;
	updatedAt: Date;
}
export interface ICreatePostCategoryDTO {
	name: string;
}
