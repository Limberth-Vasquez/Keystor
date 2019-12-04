import Repository from "./repository";
import { ContractStatusModel } from "../model/ContractStatus.model";
let ObjectId = require('mongodb').ObjectId;
class ContractStatusRepository extends Repository {
    constructor() {
        super('ContractStatus');
    }
    create = async (status: string
        ):
        Promise<any> => {
        let active = true;
        await super.insertOne({ 
            status,active
         });
    }
    find = async (where: object): Promise<ContractStatusModel[]> => await super.find(where);
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

export const contractStatusRepository = new ContractStatusRepository();