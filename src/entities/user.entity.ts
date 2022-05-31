import { Role } from 'src/role/role.enum';
import { Entity, Column, PrimaryGeneratedColumn,Unique, CreateDateColumn, UpdateDateColumn, OneToOne} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({nullable: false})
  firstName: string;

  @Column({nullable: false})
  lastName: string;
  
  @Column({unique: true,nullable: false})
  email : string;


  @Column({nullable: false})
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  roles: Role;
  @Column({default:0})
   money:number;
  @Column({nullable: true , default :'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'})
  avatarUrl: string;
 
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}