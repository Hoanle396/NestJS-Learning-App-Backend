import { Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToOne } from "typeorm";
import { Rate } from "./rate.entity";
import { User } from "./user.entity";

@Entity('comment')
export class Comment{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   content:string;

   @ManyToOne(()=>Rate,rate => rate.comment)
   rate:Rate;

   @OneToOne(() => User, (user) => user.id)
   user: User
}