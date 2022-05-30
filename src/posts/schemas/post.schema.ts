import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  user_email: string;

  @Prop()
  content: string;

  @Prop()
  likedBy: [{ user_id: string; user_email: string }];
  // @Prop()
  // comments: [{ body: string; user_email: string; user_id: string }];
  @Prop()
  likes: number;

  // @Prop()
  // createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
