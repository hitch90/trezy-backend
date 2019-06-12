import { UserRepository } from "../repository/UserRepository";
import errorCodes from "../helper/errorCodes";
interface IParams {
  id?: number | string;
  slug?: string;
}

export class UserController {
  constructor(private userRepository: UserRepository) {}

  async register(
    email: string,
    password: string,
    firstName: string = "",
    lastName: string = ""
  ) {
    if (!email) {
      return { type: "error", msg: errorCodes.EMAIL_NOT_SET };
    }
    if (!password) {
      return { type: "error", msg: errorCodes.PASSWORD_NOT_SET };
    }
    const isExist = await this.userRepository.isExist(email);
    if (isExist) {
      return { type: "error", msg: errorCodes.EMAIL_EXIST };
    }
    return await this.userRepository
      .add({ email, password, firstName, lastName })
      .then(() => {
        return true;
      })
      .catch(() => {
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }
}
