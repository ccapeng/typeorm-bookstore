import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./book";

@Entity({ name: 'category' }) // table name in database
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column({ unique: true }) //set name as unique
  name: string;

  @OneToMany(type => Book, book => book.category)
  books: Book[];

}