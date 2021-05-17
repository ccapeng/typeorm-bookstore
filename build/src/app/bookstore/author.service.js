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
exports.deleteAuthor = exports.updateAuthor = exports.getAuthor = exports.createAuthor = void 0;
const author_1 = require("@entity/author");
// CREATE
const createAuthor = (author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _author = new author_1.Author();
        _author['lastName'] = author['lastName'];
        _author['firstName'] = author['firstName'];
        return yield _author.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.createAuthor = createAuthor;
// GET
const getAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (authorId) {
            return yield author_1.Author.findOne({
                where: { id: authorId },
            });
        }
        else { // get all
            return yield author_1.Author.find();
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAuthor = getAuthor;
// UPDATE
const updateAuthor = (author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _author = yield author_1.Author.findOne({ where: { id: author['id'] } });
        if (!_author) {
            return { message: "Author is not found." };
        }
        if (author['lastName']) {
            _author['lastName'] = author['lastName'];
        }
        if (author['firstName']) {
            _author['firstName'] = author['firstName'];
        }
        return yield _author.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateAuthor = updateAuthor;
// DELETE
const deleteAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _author = yield author_1.Author.findOne({ where: { id: authorId } });
        if (!_author) {
            return { message: "Author is not found." };
        }
        return yield _author.remove();
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteAuthor = deleteAuthor;
