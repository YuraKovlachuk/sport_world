import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SportComplexEntity } from '../../sport-complex/sport-complex.entity';

@Entity()
export class ComplexOwnerEntity {
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

  @OneToMany(() => SportComplexEntity, (complex) => complex.owner)
  sportComplexes: SportComplexEntity[];
}
