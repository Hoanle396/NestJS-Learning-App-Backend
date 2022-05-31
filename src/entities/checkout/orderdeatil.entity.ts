import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../course.entity";
import { User } from "../user.entity";
import { Order } from "./order.entity";

@Entity('orderdetails')
export class OrderDetail {
   @PrimaryGeneratedColumn()
   id:number;

   @ManyToOne(()=>Order,(order:Order)=> order.id)
   order:Order;

   @Column()
   fee:number;
   
   @ManyToOne(()=>Course,(course:Course)=>course.id)
   course:Course;

   @ManyToOne(()=>User, (user:User) => user.id)
   user:User;
   

}