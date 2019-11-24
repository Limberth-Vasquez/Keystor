import { Location } from "./Location.model";

export class Warehouse{
    public _id?: string;
    public name: string;
    public email: string;    
    public locationID: Location;
    public country: string;
    public wareHouseOwnerID: any;
    public timeOpen: Date;
    public timeClose: Date;
    public capacity_per_pallet: Float32Array;
    public capacity_per_space: Float32Array;
    public fees1: Float32Array;
    public fees2: Float32Array;
    public fees3: Float32Array;
    public photo?: string;
    public photo2: string;
    public photo3: string;
}










