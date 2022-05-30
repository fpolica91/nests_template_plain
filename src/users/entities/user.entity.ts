import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @IsEmail()
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @ManyToMany(() => User, (user) => user.followedBy)
  @JoinTable({
    name: 'user_followers',
    joinColumn: { name: 'follower_id' },
    inverseJoinColumn: { name: 'following_id' },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followedBy: User[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
