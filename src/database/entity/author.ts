import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./book";

@Entity({ name: 'author' }) // table name in database
export class Author extends BaseEntity {

  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @OneToMany(type => Book, book => book.author)
  books: Book[];

}