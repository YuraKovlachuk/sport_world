import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserMembershipEntity } from './user-membership.entity';
import { ServiceEntity } from '../service.entity';

@Entity()
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => UserMembershipEntity,
    (userMembership) => userMembership.membership,
  )
  usersMemberships: UserMembershipEntity[];

  @ManyToOne(() => ServiceEntity, (service) => service.memberships)
  service: ServiceEntity;
}
