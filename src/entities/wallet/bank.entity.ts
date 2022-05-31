import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('bank')
export class Bank{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   stk:string;

   @Column()
   bank:string;

   @Column()
   author: string;

   @Column()
   branch:string;

   @Column()
   note:string;
   
   @Column()
   logo:string;
}