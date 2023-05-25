import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceEntity } from '../service.entity';

export enum WeekDays {
  Mon = 'Monday',
  Tue = 'Tuesday',
  Wed = 'Wednesday',
  Th = 'Thursday',
  Fr = 'Friday',
  St = 'Saturday',
  Sun = 'Sunday',
}

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: WeekDays,
    default: WeekDays.Mon,
  })
  weekDay: WeekDays;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => ServiceEntity, (service) => service.schedules)
  service: ServiceEntity;
}
