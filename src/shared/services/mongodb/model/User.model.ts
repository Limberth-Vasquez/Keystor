import { RolModel } from "./Rol.model";
import { LocationModel } from "./Location.model";

export class UserModel{
    public _id?: string;
    public personalID: string;
    public user: string;
    public name: string;
    public lastName: string;
    public secondLastName: string;
    public email: string;
    public phone: string;
    public locationID: LocationModel;
    public rolID: RolModel;
}