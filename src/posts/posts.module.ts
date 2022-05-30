import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from './schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],

  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
