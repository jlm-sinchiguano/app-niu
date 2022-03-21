"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyController = void 0;
var company_1 = __importDefault(require("../models/company"));
var CompanyController = /** @class */ (function () {
    function CompanyController() {
        // Create endpoint /api/companies for POST
        this.postCompanies = function (req, res) {
            // Create a new instance of the Company model
            var company = new company_1.default();
            // Set the company properties that came from the POST data
            company.name = req.body.name;
            company.type = req.body.type;
            company.quantity = req.body.quantity;
            company.userId = req.user._id;
            // Save the company and check for errors
            company.save(function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'COmpany added to the locker!', data: company });
            });
        };
        // Create endpoint /api/companies for GET
        this.getCompanies = function (req, res) {
            // Use the Company model to find all company
            company_1.default.find({ userId: req.user._id }, function (err, companies) {
                if (err)
                    return res.send(err);
                res.json(companies);
            });
        };
        // Create endpoint /api/companies/:company_id for GET
        this.getCompany = function (req, res) {
            // Use the Company model to find a specific company
            company_1.default.find({ userId: req.user._id, _id: req.params.company_id }, function (err, company) {
                if (err)
                    return res.send(err);
                res.json(company);
            });
        };
        // Create endpoint /api/companies/:company_id for PUT
        this.putCompany = function (req, res) {
            // Use the Company model to find a specific company
            return company_1.default.updateOne({ userId: req.user._id, _id: req.params.company_id }, { quantity: req.body.quantity })
                .then(function (company) {
                console.log(company);
                return res.json({ message: 'Company updated from the locker!' });
            })
                .catch(function (err) { return res.send(err); });
        };
        // Create endpoint /api/companies/:company_id for DELETE
        this.deleteCompany = function (req, res) {
            // Use the Company model to find a specific company and remove it
            company_1.default.remove({ userId: req.user._id, _id: req.params.company_id }, function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'Company removed from the locker!' });
            });
        };
    }
    return CompanyController;
}());
exports.companyController = new CompanyController();
