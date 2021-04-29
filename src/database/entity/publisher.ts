import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./book";

@Entity({ name: 'publisher' }) // table name in database
export class Publisher extends BaseEntity {

  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column({ unique: true }) //set name as unique
  name: string;

  @OneToMany(type => Book, book => book.publisher)
  books: Book[];

}