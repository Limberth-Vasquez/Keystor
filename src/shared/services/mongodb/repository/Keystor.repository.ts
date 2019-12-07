import Repository from "./repository";
import { KeystorModel } from "../model/Keystor.model";
import { LocationModel } from "../model/Location.model";
import { RolModel } from "../model/Rol.model";
let ObjectId = require('mongodb').ObjectId;
class KeystorRepository extends Repository {
    constructor() {
        super('Keystor');
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
        verificationLogs?: any
    ):
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

        if (verificationLogs)
            data['verificationLogs'] = verificationLogs;

        await super.insertOne(data);
    }
    find = async (where: object): Promise<KeystorModel[]> => await super.find(where);
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

export const keystorRepository = new KeystorRepository();