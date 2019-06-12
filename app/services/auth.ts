import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";
import config from "../config/config";
import errorCodes from "../helper/errorCodes";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async check(login: string, password: string) {
    return this.userRepository
      .isAuth(login, password)
      .then(res => {
        if (res) {
          return {
            token: this.generateToken(),
            ...res
          };
        } else {
          return {
            type: "error",
            msg: errorCodes.WRONG_PASSWORD
          };
        }
      })
      .catch(() => {
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }

  generateToken() {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, config.secret, {
      expiresIn: 86400
    });
    return token;
  }

  verify(token: any) {
    return jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    });
  }
}
