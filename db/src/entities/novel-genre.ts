import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NovelGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  genre_id: number;

  @Index()
  @Column({ type: "int", nullable: false })
  novel_id: number;
}
