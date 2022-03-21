// Load required packages
import { Schema, model} from "mongoose";
import { Document } from "mongoose";
var bcrypt = require("bcrypt-nodejs");

export interface User extends Document {
  username: string;
  password: string;
}

// Define our user schema
const UserSchema = new Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre<User>('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err:Error, salt:string) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err:Error, hash: string) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err:Error, isMatch:any) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
export default model<User>('User', UserSchema);