import { Category } from '@entity/category';
import { Publisher } from '@entity/publisher';
import { Author } from '@entity/author';
import { Book } from '@entity/book';

import { getCategory } from './category.service';
import { getPublisher } from './publisher.service';
import { getAuthor } from './author.service';
import { getRepository } from "typeorm";

export interface IBook {
  title: string,
  categoryId: number,
  publisherId: number,
  authorId: number
}

// CREATE
export const createBook = async (book: IBook) => {
  try {
    const _book = new Book();
    _book.title = book['title'];
    const _category = await getCategory(book['categoryId']);
    if (typeof _category === "object" && _category !== null){
      let _newCategory = _category as Category
      _book.category = _newCategory
    }
    const _publisher = await getPublisher(book['publisherId']);
    if (typeof _publisher === "object" && _publisher !== null){
      let _newPublisher = _publisher as Publisher
      _book.publisher = _newPublisher;
    }
    const _author = await getAuthor(book['authorId']);
    if (typeof _author === "object" && _author !== null){
      let _newAuthor = _author as Author
      _book.author = _newAuthor;
    }
    
    return await _book.save();
  } catch (e) {
    console.error(e);
  }
}

// GET
export const getBook = async (bookId?: number) => {
  
  // try {
  //   if (bookId) {
  //     return await Book.findOne({
  //       where: { id: bookId },
  //     });
  //   } else {        // get all
  //     return await Book.find();
  //   }
  // } catch (e) {
  //   console.error(e);
  // }

  try {
    if (bookId) {
      // const book = await getRepository(Book)
      //   .createQueryBuilder("book")
      //   .leftJoinAndSelect("book.category", "category")
      //   .leftJoinAndSelect("book.publisher", "publisher")
      //   .leftJoinAndSelect("book.author", "author")
      //   .where("book.id = :id", { id: bookId })
      //   .getOne();
      
      // return book;
      // return await Book.findOne({
      //   where: { id: bookId },
      // });

      let book = await Book.findOne({
        where: { id: bookId },
      });
      console.log("book", book);
      return book;

    } else {        // get all
      const books = await getRepository(Book)
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.category", "category")
        .leftJoinAndSelect("book.publisher", "publisher")
        .leftJoinAndSelect("book.author", "author")
        .getMany();
      return books;
    }
  } catch (e) {
    console.error(e);
  }

}

// UPDATE
export const updateBook = async (book: { id: number } & IBook) => {
  try {
    const _book = await Book.findOne({ where: { id: book['id'] } });
    if (!_book) {
      return { message: "Book is not found." };
    }

    if (book['title']) {
      _book['title'] = book['title'];
    }

    return await _book.save();

  } catch (e) {
    console.error(e);
  }
}

// DELETE
export const deleteBook = async (bookId: number) => {
  try {
    const _book = await Book.findOne({ where: { id: bookId } });
    if (!_book) {
      return { message: "Book is not found." };
    }
    return await _book.remove();
  } catch (e) {
    console.error(e);
  }
}