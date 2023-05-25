import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserMembershipEntity } from '../../sport-complex/service/membership/user-membership.entity';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @OneToMany(
    () => UserMembershipEntity,
    (userMembership) => userMembership.customer,
  )
  usersMemberships: UserMembershipEntity[];
}
