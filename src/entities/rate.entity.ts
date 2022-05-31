import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Course } from "./course.entity";
import { User } from "./user.entity";


@Entity("rate")
export class Rate {
    
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({default:0})
    onestars:number

    @Column({default:0})
    twostars:number

    @Column({default:0})
    threestars:number

    @Column({default:0})
    fourstars:number

    @Column({default:0})
    fivestars:number

    @OneToMany(() => Comment, (cm) => cm.rate)
    comment: Comment[];

    @OneToMany(() => User, (user) => user.id)
    user: User[];
}