import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipEntity } from './membership.entity';
import { CustomerEntity } from '../../../account/customer/customer.entity';
import { PaymentEntity } from '../payment/payment.entity';

@Entity()
export class UserMembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(
    () => MembershipEntity,
    (membership) => membership.usersMemberships,
  )
  membership: MembershipEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.usersMemberships)
  customer: CustomerEntity;

  @OneToOne(() => PaymentEntity)
  @JoinColumn()
  payment: PaymentEntity;
}
