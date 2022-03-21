"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport_1 = __importDefault(require("passport"));
var company_1 = require("./controllers/company");
var user_1 = require("./controllers/user");
var auth_1 = require("./controllers/auth");
var oauth2Controller = require('./controllers/oauth2');
var client_1 = require("./controllers/client");
// Connect to the apiNiulocker MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/apiNiulocker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
// Create our Express application
var app = (0, express_1.default)();
// Set view engine to ejs
app.set('view engine', 'ejs');
// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));
// Use the passport package in our application
app.use(passport_1.default.initialize());
// Create our Express router
var router = express_1.default.Router();
// Create endpoint handlers for /companies
router.route('/companies')
    .post(auth_1.authController.isAuthenticated, company_1.companyController.postCompanies)
    .get(auth_1.authController.isAuthenticated, company_1.companyController.getCompanies);
// Create endpoint handlers for /companies/:company_id
router.route('/companies/:company_id')
    .get(auth_1.authController.isAuthenticated, company_1.companyController.getCompany)
    .put(auth_1.authController.isAuthenticated, company_1.companyController.putCompany)
    .delete(auth_1.authController.isAuthenticated, company_1.companyController.deleteCompany);
// Create endpoint handlers for /users
router.route('/users')
    .post(user_1.userController.postUsers)
    .get(auth_1.authController.isAuthenticated, user_1.userController.getUsers);
// Create endpoint handlers for /clients
router.route('/clients')
    .post(auth_1.authController.isAuthenticated, client_1.clientController.postClients)
    .get(auth_1.authController.isAuthenticated, client_1.clientController.getClients);
// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(auth_1.authController.isAuthenticated, oauth2Controller.authorization)
    .post(auth_1.authController.isAuthenticated, oauth2Controller.decision);
// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
    .post(auth_1.authController.isClientAuthenticated, oauth2Controller.token);
// Register all our routes with /api
app.use('/api', router);
// Start the server
app.listen(3000);
