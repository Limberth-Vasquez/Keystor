import { Rol } from "./Rol.model";
import { Location } from "./Location.model";

export class User{
    public _id?: string;
    public personalID: string;
    public user: string;
    public name: string;
    public lastName: string;
    public secondLastName: string;
    public email: string;
    public phone: string;
    public locationID: Location;
    public rolID: Rol;
    public events: any;
}