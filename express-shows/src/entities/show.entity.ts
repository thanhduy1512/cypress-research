import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Band } from './band.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  scheduledAt: Date;

  @Column({ nullable: true })
  bandId: number;

  @ManyToOne(
    (type) => Band,
    (band) => {
      band.shows;
    },
    { onDelete: 'CASCADE' }
  )
  band: Band;

  @Column()
  availableSeatCount: number;
}
