import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportComplexEntity } from '../sport-complex.entity';
import { ScheduleEntity } from './schedule/schedule.entity';
import { ServiceTypeEntity } from './serviceType/service-type.entity';
import { MembershipEntity } from './membership/membership.entity';

@Entity()
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => SportComplexEntity, (complex) => complex.services)
  sportComplex: SportComplexEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.service)
  schedules: ScheduleEntity[];

  @OneToOne(() => ServiceTypeEntity)
  @JoinColumn()
  type: ServiceTypeEntity;

  @OneToMany(() => MembershipEntity, (membership) => membership.service)
  memberships: MembershipEntity[];
}
