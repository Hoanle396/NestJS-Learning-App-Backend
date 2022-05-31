import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('giftvoucher')
export class GiftVoucher{
   @PrimaryGeneratedColumn()
   id:number;
   @Column()
   giftcode:string;
   @Column()
   sale:number;
   @Column()
   startDate:Date;
   @Column()
   endDate:Date;
}