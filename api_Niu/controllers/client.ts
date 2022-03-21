// Load required packages
import { Request, Response } from 'express';
import ClientModel, { Client } from '../models/client';


class ClientController {
  // Create endpoint /api/client for POST
  public postClients = function (req: any, res: Response) {
    // Create a new instance of the Client model
    const client: Client  = new ClientModel()

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
  public getClients = function (req: any, res: any) {
    // Use the Client model to find all clients
    ClientModel.find({ userId: req.user._id }, function (err: any, clients: any) {
      if (err)
        return res.send(err);

      res.json(clients);
    });
  };
}



export const clientController = new ClientController();