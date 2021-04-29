import { 
  BaseEntity,
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne,  
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "./category";
import { Publisher } from "./publisher";
import { Author } from "./author";

@Entity({ name: 'book' }) // table name in database
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column()
  title: string;

  @Column({nullable:true})
  categoryId: number;

  @Column({nullable:true})
  publisherId: number;

  @Column({nullable:true})
  authorId: number;

  @ManyToOne(type => Category, category => category.books)
  @JoinColumn()
  category: Category;

  @ManyToOne(type => Publisher, publisher => publisher.books)
  @JoinColumn()
  publisher: Publisher;

  @ManyToOne(type => Author, author => author.books)
  @JoinColumn()
  author: Author;

}