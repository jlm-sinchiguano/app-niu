// Load required packages
import { Request, Response } from 'express';
import UserModel, { User } from '../models/user';

class UserController {
  // Create endpoint /api/users for POST
  public postUsers = function (req: Request, res: Response) {
    const user: User = new UserModel({
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
  public getUsers = function (req: any, res: Response) {
    UserModel.find(function (err, users) {
      if (err)
        return res.send(err);

      res.json(users);
    });
  };
}

export const userController = new UserController();
