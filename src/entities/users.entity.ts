import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Contact } from "./contacts.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150, type: "varchar" })
  fullName: string;

  @Column({ length: 128, unique: true, type: "varchar" })
  email: string;

  @Column({ length: 128, type: "varchar" })
  password: string;

  @Column({ length: 11, unique: true, type: "varchar" })
  foneNumber: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | undefined | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
