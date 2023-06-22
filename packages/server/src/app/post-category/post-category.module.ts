import { Module } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryController } from './post-category.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [PostCategoryController],
	providers: [PostCategoryService]
})
export class PostCategoryModule { }
