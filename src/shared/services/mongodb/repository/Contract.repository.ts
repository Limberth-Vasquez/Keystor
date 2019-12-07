import Repository from "./repository";
import { ContractModel } from "../model/Contract.model";

let ObjectId = require('mongodb').ObjectId;

class ContractRepository extends Repository {
    constructor() {
        super('Contract');
    }
    create = async (
        contractId: string,
        warehouseId: any,
        userClientID: any,
        name: string,
        createDate: Date,
        endDate: Date,
        costValue: string,
        typeService: any,
        status: any,
        description: string,
        aprovedKeystor?: boolean
    ):
        Promise<any> => {
        let active = true;
        let data = {
            contractId,
            warehouseId,
            userClientID,
            name,
            createDate,
            endDate,
            costValue,
            typeService,
            status,
            description,
            active
        };
        if (aprovedKeystor)
            data['aprovedKeystor'] = aprovedKeystor;
            
        await super.insertOne(data);
    }
    find = async (where: object): Promise<ContractModel[]> => await super.find(where);

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

export const contractRepository = new ContractRepository();