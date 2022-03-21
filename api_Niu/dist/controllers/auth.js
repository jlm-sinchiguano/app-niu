"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
// Load required packages
var passport_1 = __importDefault(require("passport"));
var passport_http_1 = require("passport-http");
var passport_http_bearer_1 = require("passport-http-bearer");
var user_1 = __importDefault(require("../models/user"));
var client_1 = __importDefault(require("../models/client"));
var token_1 = __importDefault(require("../models/token"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    return AuthController;
}());
passport_1.default.use(new passport_http_1.BasicStrategy(function (username, password, callback) {
    user_1.default.findOne({ username: username }, function (err, user) {
        if (err) {
            return callback(err);
        }
        // No user found with that username
        if (!user) {
            return callback(null, false);
        }
        // Make sure the password is correct
        user.verifyPassword(password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }
            // Password did not match
            if (!isMatch) {
                return callback(null, false);
            }
            // Success
            return callback(null, user);
        });
    });
}));
passport_1.default.use('client-basic', new passport_http_1.BasicStrategy(function (username, password, callback) {
    client_1.default.findOne({ id: username }, function (err, client) {
        if (err) {
            return callback(err);
        }
        // No client found with that id or bad password
        if (!client || client.secret !== password) {
            return callback(null, false);
        }
        // Success
        return callback(null, client);
    });
}));
passport_1.default.use(new passport_http_bearer_1.Strategy(function (accessToken, callback) {
    token_1.default.findOne({ value: accessToken }, function (err, token) {
        if (err) {
            return callback(err);
        }
        // No token found
        if (!token) {
            return callback(null, false);
        }
        user_1.default.findOne({ _id: token.userId }, function (err, user) {
            if (err) {
                return callback(err);
            }
            // No user found
            if (!user) {
                return callback(null, false);
            }
            // Simple example with no scope
            callback(null, user, { scope: '*' });
        });
    });
}));
//exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
//exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
//exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport_1.default.authenticate(['basic', 'bearer'], { session: false });
