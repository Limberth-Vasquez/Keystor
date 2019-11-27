import Repository from "./repository";
import { UserAdvertiserModel } from "../model/UserAdvertiser.model";
import { LocationModel } from "../model/Location.model";
import { RolModel } from "../model/Rol.model";
let ObjectId = require('mongodb').ObjectId;
class UserAdvertiserRepository extends Repository {
    constructor() {
        super('UserAdvertiser');
    }
    create = async (
        user: string,
        name: string,
        lastName: string,
        secondLastName: string,
        email: string,
        locationID: LocationModel,
        rolID: RolModel,
        campanyName: string,
        idComapany: string,
        phone?: string,
        personalID?: string,
        servicesAdvertises?: any
    ):
        Promise<any> => {
        let active = true;
        var data = { user, name, lastName, secondLastName, email, locationID, rolID, campanyName, idComapany,active};

        if (phone)
            data['phone'] = phone;

        if (personalID)
            data['personalID'] = personalID;

        if (servicesAdvertises)
            data['servicesAdvertises'] = servicesAdvertises;
        
        await super.insertOne(data);
    }
    find = async (where: object): Promise<UserAdvertiserModel[]> => await super.find(where);

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

export const userAdvertiserRepository = new UserAdvertiserRepository();