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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUser = void 0;
const role_1 = require("@entity/role");
const user_1 = require("@entity/user");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_1.User.find({ relations: ['roles'] });
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAllUser = getAllUser;
const createUser = ({ email, roles }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _newUser = new user_1.User();
        _newUser['email'] = email;
        // _newUser.roles = newRoles;
        yield _newUser.save();
        yield Promise.all(roles.map((_role) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const _new = new role_1.Role();
                _new['role'] = _role;
                _new.user = _newUser;
                return _new.save();
            }
            catch (e) {
                console.error(e);
            }
        })));
        return yield user_1.User.findOne({
            where: { email: email },
            relations: ['roles']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.createUser = createUser;
const updateUser = ({ id, email, roles }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _updatedUser = yield user_1.User.findOne({ where: { id }, relations: ['roles'] });
        if (!_updatedUser)
            return { message: "User is not found!" };
        _updatedUser['email'] = email;
        yield Promise.all((_a = _updatedUser['roles']) === null || _a === void 0 ? void 0 : _a.map((_role) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return _role.remove();
            }
            catch (e) {
                console.error(e);
            }
        })));
        yield _updatedUser.save();
        yield Promise.all(roles.map((_role) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const _new = new role_1.Role();
                _new['role'] = _role;
                _new.user = _updatedUser;
                return _new.save();
            }
            catch (e) {
                console.error(e);
            }
        })));
        return yield user_1.User.findOne({
            where: { email: email },
            relations: ['roles']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateUser = updateUser;
const deleteUser = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield user_1.User.findOne({ id: id });
        return yield (foundUser === null || foundUser === void 0 ? void 0 : foundUser.remove());
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteUser = deleteUser;
