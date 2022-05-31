import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";

@Entity('recharge')
export class Recharge{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   uuid:string;

   @ManyToOne(()=>User,(user) => user.id)
   user:User;

   @Column()
   amount:number;

   @CreateDateColumn()
   time:Date;

   @Column({default:"pending"})
   status:string;

   @Column({nullable:true})
   note: string;
}