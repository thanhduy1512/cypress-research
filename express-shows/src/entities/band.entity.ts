import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Show } from './show.entity';

@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany((type) => Show, (show) => show.band, { onDelete: 'CASCADE' })
  shows: Show[];
}
