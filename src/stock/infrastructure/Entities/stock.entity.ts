import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({unique: true})
  public name: string;

  @Column()
  public description: string;

  @Column()
  public value: number;
}

