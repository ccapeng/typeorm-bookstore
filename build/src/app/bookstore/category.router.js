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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CategoryController = void 0;
const tsoa_1 = require("tsoa");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController extends tsoa_1.Controller {
    // GET ALL
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return category_service_1.getCategory();
        });
    }
    // CREATE
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let obj = yield category_service_1.createCategory(category);
                if (typeof (obj) === "undefined") {
                    this.setStatus(201);
                }
                return obj;
            }
            catch (error) {
                this.setStatus(500);
                return {
                    message: error
                };
            }
        });
    }
    //GET By ID
    getWithId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = yield category_service_1.getCategory(categoryId);
            if (typeof (obj) === "undefined") {
                this.setStatus(404);
            }
            return obj;
        });
    }
    // UPDATE
    update(categoryId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_service_1.updateCategory({ id: Number(categoryId), name: body.name });
        });
    }
    // DELETE
    delete(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = yield category_service_1.deleteCategory(categoryId);
            if (typeof (obj) === "undefined") {
                this.setStatus(204);
            }
            return obj;
        });
    }
};
__decorate([
    tsoa_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    tsoa_1.Post(''),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    tsoa_1.Get('/{categoryId}'),
    __param(0, tsoa_1.Path('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getWithId", null);
__decorate([
    tsoa_1.Put('/{categoryId}/'),
    __param(0, tsoa_1.Path('categoryId')), __param(1, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    tsoa_1.Delete('/{categoryId}'),
    __param(0, tsoa_1.Path('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    tsoa_1.Tags('Category'),
    tsoa_1.Route('/api/categories')
], CategoryController);
exports.CategoryController = CategoryController;
