import * as bcrypt from "bcrypt";
import { IUser, User } from "../models/user";
export class UserRepository {
  saltRounds = 10;

  constructor() {}

  public async isExist(email: string): Promise<boolean> {
    return User.findOne({ where: { email } }).then((user: any) => {
      if (user === null) {
        return false;
      }
      return true;
    });
  }

  public async add(payload: IUser): Promise<any> {
    return bcrypt.hash(
      payload.password,
      this.saltRounds,
      (err: any, hash: any) => {
        if (!err) {
          payload.password = hash;
          console.log(payload);
          return User.create(payload);
        }
      }
    );
  }

  public async get(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email } })
        .then((user: IUser) => {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              user.password = undefined;
              user.id = undefined;
              resolve(user);
            } else {
              resolve(false);
            }
          });
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  }

  public async isAuth(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email } })
          .then((user: IUser) => {
            bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                resolve({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  role: user.role
                });
              } else {
                resolve(false);
              }
            });
          })
          .catch((err:any) => {
            reject(err);
          });
    });
  }
}
