import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Show } from './show.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  showId: number;

  @ManyToOne((type) => Show, { onDelete: 'CASCADE' })
  @JoinColumn()
  show: Show;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  seatCount: number;
}
