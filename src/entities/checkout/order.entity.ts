import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdeatil.entity";

@Entity('order')
export class Order{
   @PrimaryGeneratedColumn()
   id:number;

   @CreateDateColumn()
   time:Date;
   
   @OneToMany(() =>OrderDetail,(order)=>order.order)
   detail:OrderDetail[]

}