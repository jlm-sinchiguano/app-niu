"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var user_1 = __importDefault(require("../models/user"));
var UserController = /** @class */ (function () {
    function UserController() {
        // Create endpoint /api/users for POST
        this.postUsers = function (req, res) {
            var user = new user_1.default({
                username: req.body.username,
                password: req.body.password
            });
            user.save(function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'New User  added to the locker!' });
            });
        };
        // Create endpoint /api/users for GET
        this.getUsers = function (req, res) {
            user_1.default.find(function (err, users) {
                if (err)
                    return res.send(err);
                res.json(users);
            });
        };
    }
    return UserController;
}());
exports.userController = new UserController();
