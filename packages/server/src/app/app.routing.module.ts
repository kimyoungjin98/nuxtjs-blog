import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { PostModule } from './post/post.module';

const routes: Routes = [
	{ path: 'auth', module: AuthModule },
	{ path: 'post', module: PostModule },
	{ path: 'post-category', module: PostCategoryModule },
]

@Module({
	imports: [
		RouterModule.register(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }