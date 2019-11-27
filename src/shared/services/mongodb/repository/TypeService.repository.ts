import Repository from "./repository";
import { TypeServiceModel } from "../model/TypeService.model";
let ObjectId = require('mongodb').ObjectId;
class TypeServiceRepository extends Repository {
    constructor() {
        super('TypeService');
    }
    create = async (name: string, ):
    Promise<any> => {
    let active = true;
    await super.insertOne({ name, active });
}
    find = async (where: object): Promise<TypeServiceModel[]> => await super.find(where);

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

export const typeServiceRepository = new TypeServiceRepository();