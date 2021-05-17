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
exports.deletePublisher = exports.updatePublisher = exports.getPublisher = exports.createPublisher = void 0;
const publisher_1 = require("@entity/publisher");
// CREATE
const createPublisher = (publisher) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _publisher = new publisher_1.Publisher();
        _publisher['name'] = publisher['name'];
        return yield _publisher.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.createPublisher = createPublisher;
// GET
const getPublisher = (publisherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (publisherId) {
            return yield publisher_1.Publisher.findOne({
                where: { id: publisherId },
            });
        }
        else { // get all
            return yield publisher_1.Publisher.find();
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getPublisher = getPublisher;
// UPDATE
const updatePublisher = (publisher) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _publisher = yield publisher_1.Publisher.findOne({ where: { id: publisher['id'] } });
        if (!_publisher) {
            return { message: "publisher is not found." };
        }
        if (publisher['name']) {
            _publisher['name'] = publisher['name'];
        }
        return yield _publisher.save();
    }
    catch (e) {
        console.error(e);
    }
});
exports.updatePublisher = updatePublisher;
// DELETE
const deletePublisher = (publisherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _publisher = yield publisher_1.Publisher.findOne({ where: { id: publisherId } });
        if (!_publisher) {
            return { message: "Publisher is not found." };
        }
        return yield _publisher.remove();
    }
    catch (e) {
        console.error(e);
    }
});
exports.deletePublisher = deletePublisher;
