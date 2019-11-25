import { LocationModel } from "./Location.model";

export class WarehouseModel {
    public _id?: string;
    public name: string;
    public email: string;
    public locationID: LocationModel;
    public country: string;
    public wareHouseOwnerID: any;
    public timeOpen: Date;
    public timeClose: Date;
    public capacityPerPallet: Float32Array;
    public capacityPerSpace: Float32Array;
    public fees1: Float32Array;
    public fees2?: Float32Array;
    public fees3?: Float32Array;
    public photo: string;
    public photo2?: string;
    public photo3?: string;
    public active: boolean;
}