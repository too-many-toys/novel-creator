import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class NovelChapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "int", nullable: false })
  novel_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "text", nullable: false })
  content: string;

  @CreateDateColumn({ type: "timestamp", comment: "생성일" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", comment: "수정일" })
  updated_at: Date;
}
