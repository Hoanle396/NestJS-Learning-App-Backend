import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transfer')
export class Transfer{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   receive:string;

   @Column()
   give:string;

   @Column()
   amount:number;

   @Column()
   reasons:string;
   
   @CreateDateColumn()
   time:Date;
}