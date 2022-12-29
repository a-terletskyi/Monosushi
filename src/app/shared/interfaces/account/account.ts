import {ROLE} from "../../constants/role.constant";

export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
  orders: Array<object>,
  role: ROLE
}
