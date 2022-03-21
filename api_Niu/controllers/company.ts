// Load required packages
import { Request, Response } from 'express';
import CompanyModel, { Company } from '../models/company';

class CompanyController {

  // Create endpoint /api/companies for POST
  public postCompanies = function (req: any, res: Response) {
    // Create a new instance of the Company model
    const company: Company = new CompanyModel();

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
  public getCompanies = function (req:any, res:Response) {
    // Use the Company model to find all company
    CompanyModel.find({ userId: req.user._id }, function (err, companies) {
      if (err)
        return res.send(err);

      res.json(companies);
    });
  };

// Create endpoint /api/companies/:company_id for GET
 public getCompany = function (req:any, res:Response) {
    // Use the Company model to find a specific company
    CompanyModel.find({ userId: req.user._id, _id: req.params.company_id }, function (err, company) {
      if (err)
        return res.send(err);

      res.json(company);
    });
  };

// Create endpoint /api/companies/:company_id for PUT
public putCompany = function (req:any, res:Response) {
    // Use the Company model to find a specific company
    return CompanyModel.updateOne({ userId: req.user._id, _id: req.params.company_id }, { quantity: req.body.quantity })
      .then((company) => {
        console.log(company)
        return res.json({ message: 'Company updated from the locker!' })
      })
      .catch(err => res.send(err));
  };

// Create endpoint /api/companies/:company_id for DELETE
public deleteCompany = function (req:any, res:Response) {
    // Use the Company model to find a specific company and remove it
    CompanyModel.remove({ userId: req.user._id, _id: req.params.company_id }, function (err) {
      if (err)
        return res.send(err);

      res.json({ message: 'Company removed from the locker!' });
    });
  };

}

export const companyController = new CompanyController();