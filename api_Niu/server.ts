import express from 'express';
import mongoose from 'mongoose';
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
import passport from 'passport';
import {companyController} from './controllers/company';
import { userController } from './controllers/user';
import  {isAuthenticated, isClientAuthenticated } from './controllers/auth';
const oauth2Controller = require('./controllers/oauth2');
import { clientController } from './controllers/client';

// Connect to the apiNiulocker MongoDB
mongoose.connect('mongodb://localhost:27017/apiNiulocker',{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

// Create our Express application
var app = express();

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
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /companies
router.route('/companies')
  .post(isAuthenticated, companyController.postCompanies)
  .get(isAuthenticated, companyController.getCompanies);

// Create endpoint handlers for /companies/:company_id
router.route('/companies/:company_id')
  .get(isAuthenticated, companyController.getCompany)
  .put(isAuthenticated, companyController.putCompany)
  .delete(isAuthenticated, companyController.deleteCompany);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(isAuthenticated, clientController.postClients)
  .get(isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(isAuthenticated, oauth2Controller.authorization)
  .post(isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(6000);