import { UserModel } from "./User.model";

export class UserAdvertiserModel extends UserModel {
    public campanyName: string;
    public idComapany: string;
    public servicesAdvertises?: any;
}