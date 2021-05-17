"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const typeorm_1 = require("typeorm");
const book_1 = require("./book");
let Publisher = class Publisher extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn() //auto generated id
    ,
    __metadata("design:type", Number)
], Publisher.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }) //set name as unique
    ,
    __metadata("design:type", String)
], Publisher.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => book_1.Book, book => book.publisher),
    __metadata("design:type", Array)
], Publisher.prototype, "books", void 0);
Publisher = __decorate([
    typeorm_1.Entity({ name: 'publisher' }) // table name in database
], Publisher);
exports.Publisher = Publisher;
