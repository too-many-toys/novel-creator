import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Novel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Index()
  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  image_url: string;

  @CreateDateColumn({ type: "timestamp", comment: "생성일" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", comment: "수정일" })
  updated_at: Date;
}
