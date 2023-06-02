import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./users.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150, type: "varchar" })
  fullName: string;

  @Column({ length: 128, type: "varchar" })
  email: string;

  @Column({ length: 11, type: "varchar" })
  foneNumber: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | undefined | null;
}
