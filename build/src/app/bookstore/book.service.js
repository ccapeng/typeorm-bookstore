"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBook = exports.createBook = void 0;
const book_1 = require("@entity/book");
const category_service_1 = require("./category.service");
const publisher_service_1 = require("./publisher.service");
const author_service_1 = require("./author.service");
const typeorm_1 = require("typeorm");
// CREATE
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _book = new book_1.Book();
        _book.title = book['title'];
        const _category = yield category_service_1.getCategory(book['categoryId']);
        if (typeof _category === "object" && _category !== null) {
            let _newCategory = _category;
            _book.category = _newCategory;
        }
        const _publisher = yield publisher_service_1.getPublisher(book['publisherId']);
        if (typeof _publisher === "object" && _publisher !== null) {
            let _newPublisher = _publisher;
            _book.publisher = _newPublisher;
        }
        const _author = yield author_service_1.getAuthor(book['authorId']);
        if (typeof _author === "object" && _author !== null) {
            let _newAuthor = _author;
            _book.author = _newAuthor;
        }
        return yield _book.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.createBook = createBook;
// GET
const getBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (bookId) {
            let book = yield book_1.Book.findOne({
                where: { id: bookId },
            });
            console.log("book", book);
            return book;
        }
        else { // get all
            const books = yield typeorm_1.getRepository(book_1.Book)
                .createQueryBuilder("book")
                .leftJoinAndSelect("book.category", "category")
                .leftJoinAndSelect("book.publisher", "publisher")
                .leftJoinAndSelect("book.author", "author")
                .getMany();
            return books;
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getBook = getBook;
// UPDATE
const updateBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _book = yield book_1.Book.findOne({ where: { id: book['id'] } });
        if (!_book) {
            return { message: "Book not found." };
        }
        if (book['title']) {
            _book['title'] = book['title'];
        }
        return yield _book.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateBook = updateBook;
// DELETE
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _book = yield book_1.Book.findOne({ where: { id: bookId } });
        if (!_book) {
            return { message: "Book not found." };
        }
        return yield _book.remove();
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteBook = deleteBook;
