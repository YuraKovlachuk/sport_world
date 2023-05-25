import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ComplexOwnerEntity } from '../account/complex-owner/complex-owner.entity';
import { ServiceEntity } from './service/service.entity';
import { FeedbackEntity } from './feedback/feedback.entity';

@Entity()
export class SportComplexEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  contacts: string;

  @Column({ default: 0 })
  rate: number;

  @Column()
  image: string;

  @Column()
  city: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => ComplexOwnerEntity, (owner) => owner.sportComplexes)
  owner: ComplexOwnerEntity;

  @OneToMany(() => ServiceEntity, (service) => service.sportComplex)
  services: ServiceEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.sportComplex)
  feedbacks: FeedbackEntity[];
}
