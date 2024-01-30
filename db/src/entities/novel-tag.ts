import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NovelTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "int", nullable: false })
  novelId: number;

  @Index()
  @Column({ type: "varchar", length: 255, nullable: false })
  tag: string;
}
