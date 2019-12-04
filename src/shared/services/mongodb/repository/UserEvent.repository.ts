import Repository from "./repository";
import { UserEventModel } from "../model/UserEvent.model";
import { LocationModel } from "../model/Location.model";
import { RolModel } from "../model/Rol.model";
let ObjectId = require('mongodb').ObjectId;
class UserEventRepository extends Repository {
    constructor() {
        super('UserEvent');
    }
    create = async (
        user: string,
        name: string,
        lastName: string,
        secondLastName: string,
        email: string,
        locationID: LocationModel,
        rolID: RolModel,
        phone?: string,
        personalID?: string,
        events?: any):
        Promise<any> => {
        let active = true;
        let data = {
            user,
            name,
            lastName,
            secondLastName,
            email,
            locationID,
            rolID,
            active
        };
        if (phone)
            data['phone'] = phone;

        if (personalID)
        data['personalID'] = personalID;

        if (events)
            data['pheventsone'] = events;
            
        await super.insertOne(data);
    }
    find = async (where: object): Promise<UserEventModel[]> => await super.find(where);

    async update(set: object, where: object): Promise<any> {
        return await super.updateOne(set, where)
    }
    delete = async (_id: string):
        Promise<any> => {
        _id = new ObjectId(_id)
        let active = false;
        return await this.update({ active }, { _id }).then(result => {
            return { rows: result.length, result };
        })
    }
}

export const userEventRepository = new UserEventRepository();