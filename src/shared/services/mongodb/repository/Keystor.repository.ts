import Repository from "./repository";
import { KeystorModel } from "../model/Keystor.model";
let ObjectId = require('mongodb').ObjectId;
class KeystorRepository extends Repository {
    constructor() {
        super('Keystor');
    }
    create = async (
        personalID: string,
        user: string,
        name: string,
        lastName: string,
        secondLastName: string,
        email: string,
        phone: string,
        locationID: any,
        rolID: any,
        verificationLogs?: any
    ):
        Promise<any> => {
        let active = true;
        await super.insertOne({
            personalID,
            user,
            name,
            lastName,
            secondLastName,
            email,
            phone,
            locationID,
            rolID,
            verificationLogs,
            active 
        });
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

export const keystorModel = new KeystorModel();