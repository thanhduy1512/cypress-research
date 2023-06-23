import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Band } from './band.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  scheduledAt: Date;

  @ManyToOne((type) => Band, (band) => band.shows)
  band: Band;

  @Column()
  availableSeatCount: number;
}
