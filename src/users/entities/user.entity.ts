import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @IsEmail()
  @Column({ name: 'email', unique: true, length: 14 })
  email: string;
}
