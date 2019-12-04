import Repository from "./repository";
import { ServiceAdvertiserModel } from "../model/ServiceAdvertiser.model";
let ObjectId = require('mongodb').ObjectId;
class ServiceAdvertiserRepository extends Repository {
    constructor() {
        super('ServiceAdvertiser');
    }
    create = async (advertiserID: string, name: string, description: string, validateKeystor?: boolean):
        Promise<any> => {
        let active = true;
        let data = { advertiserID, name, description, active };
        if (validateKeystor)
            data['validateKeystor'] = validateKeystor
        await super.insertOne(data);
    }
    find = async (where: object): Promise<ServiceAdvertiserModel[]> => await super.find(where);

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

export const serviceAdvertiserRepository = new ServiceAdvertiserRepository();