import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  pen_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  intro: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255, nullable: false })
  uid: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  wallet_address: string;

  @CreateDateColumn({ type: "timestamp", comment: "생성일" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", comment: "수정일" })
  updated_at: Date;
}
