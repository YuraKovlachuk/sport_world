import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer/customer.entity';
import { ComplexOwnerEntity } from './complex-owner/complex-owner.entity';
import { MessageEntity } from '../message/message.entity';

export enum AccountType {
  customer = 'customer',
  owner = 'complex_owner',
}

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  @OneToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  @OneToOne(() => ComplexOwnerEntity)
  @JoinColumn()
  complexOwner: ComplexOwnerEntity;

  @OneToMany(() => MessageEntity, (message) => message.sent)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.to)
  receivedMessages: MessageEntity[];
}
