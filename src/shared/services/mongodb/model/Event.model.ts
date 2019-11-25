import { UserEventModel } from "./UserEvent.model";
import { LocationModel } from "./Location.model";

export class EventModel {
    public _id?: string;
    public nameEvent : string;
    public email: string;
    public phone: string;
    public locationID: LocationModel;
    public idUserEvent: UserEventModel;
    public description: string;
    public fees1: Float32Array;
    public fees2?: Float32Array;
    public fees3?: Float32Array;
    public createDate: Date;
    public startDate: Date;
    public endDate: string;
    public active: boolean;
}
