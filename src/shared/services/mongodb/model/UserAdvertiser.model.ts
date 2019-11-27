import { UserModel } from "./User.model";

export class UserAdvertiserModel extends UserModel {
    public companyName: string;
    public idCompany: string;
    public servicesAdvertises?: any;
}