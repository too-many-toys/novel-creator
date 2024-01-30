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
  @Column({ type: "varchar", length: 255, nullable: false })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  imageUrl: string;

  @CreateDateColumn({ type: "timestamp", comment: "생성일" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", comment: "수정일" })
  updatedAt: Date;
}
