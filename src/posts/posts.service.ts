import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, {
      $inc: { likes: 1 },
      $push: {
        likedBy: {
          user_id: updatePostDto.likedBy.user_id,
          user_email: updatePostDto.likedBy.user_email,
        },
      },
    });
    await updatedPost.save();
    return updatedPost;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
