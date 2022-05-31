import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";

@Entity('withdraw')
export class Withdraw{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   uuid:string;

   @ManyToOne(()=>User,(user) => user.id)
   user:User;

   @Column()
   amount:number;

   @Column()
   bank:string;

   @Column()
   stk:string;

   @Column()
   author:string;

   @Column({ nullable: true})
   branch:string;

   @CreateDateColumn()
   time:Date;

   @Column({default:"pending"})
   status:string;

   @Column({nullable:true})
   note: string;
}