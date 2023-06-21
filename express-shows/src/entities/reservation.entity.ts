import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Show } from './show.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  showId: number;

  @OneToOne((type) => Show)
  @JoinColumn()
  show: Show;

  @Column({ nullable: true })
  userId: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column()
  seatCount: number;
}
