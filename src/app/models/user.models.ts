import { Adress } from "./address.model";

export class User{

  constructor(public firstname: string,
              public lastname: string,
              public adress: Adress,
              public email: string,
              public description: string,
              public dateBirth: string,
              public aliases?: string[]) {

  }
}
