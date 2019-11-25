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
    public fees1: string;
    public fees2: string;
    public fees3: string;
    public active: boolean;
}
