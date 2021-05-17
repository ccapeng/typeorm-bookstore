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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const category_1 = require("@entity/category");
// CREATE
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _category = new category_1.Category();
        _category['name'] = category['name'];
        console.log("name", _category['name']);
        return yield _category.save();
    }
    catch (e) {
        console.log("error message:", e.message);
        return Promise.reject(e.message);
    }
});
exports.createCategory = createCategory;
// GET
const getCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (categoryId) {
            return yield category_1.Category.findOne({
                where: { id: categoryId },
            });
        }
        else { // get all
            return yield category_1.Category.find();
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getCategory = getCategory;
// UPDATE
const updateCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _category = yield category_1.Category.findOne({ where: { id: category['id'] } });
        if (!_category) {
            return { message: "Category is not found." };
        }
        if (category['name']) {
            _category['name'] = category['name'];
        }
        return yield _category.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateCategory = updateCategory;
// DELETE
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _category = yield category_1.Category.findOne({ where: { id: categoryId } });
        if (!_category) {
            return { message: "Category is not found." };
        }
        return yield _category.remove();
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteCategory = deleteCategory;
