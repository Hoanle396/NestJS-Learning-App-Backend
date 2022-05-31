import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("trending")
export class Trending{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    tile:string;

    @Column({default:0})
    numberOfTrends:number;
}