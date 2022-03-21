"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientController = void 0;
var client_1 = __importDefault(require("../models/client"));
var ClientController = /** @class */ (function () {
    function ClientController() {
        // Create endpoint /api/client for POST
        this.postClients = function (req, res) {
            // Create a new instance of the Client model
            var client = new client_1.default();
            // Set the client properties that came from the POST data
            client.name = req.body.name;
            client.id = req.body.id;
            client.secret = req.body.secret;
            client.userId = req.user._id;
            // Save the client and check for errors
            client.save(function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'Client added to the locker!', data: client });
            });
        };
        // Create endpoint /api/clients for GET
        this.getClients = function (req, res) {
            // Use the Client model to find all clients
            client_1.default.find({ userId: req.user._id }, function (err, clients) {
                if (err)
                    return res.send(err);
                res.json(clients);
            });
        };
    }
    return ClientController;
}());
exports.clientController = new ClientController();
