import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NovelGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  genreId: number;

  @Index()
  @Column({ type: "int", nullable: false })
  novelId: number;
}
