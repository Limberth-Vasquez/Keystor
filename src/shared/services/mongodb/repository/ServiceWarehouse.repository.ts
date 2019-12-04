import Repository from "./repository";
import { ServicesWarehouseModel } from "../model/ServicesWarehouse.model";
import { TypeServiceModel } from "../model/TypeService.model";
let ObjectId = require('mongodb').ObjectId;
class ServicesWarehouseRepository extends Repository {
    constructor() {
        super('ServicesWarehouse');
    }
    create = async (description: string, typeServiceId: TypeServiceModel, wareHouseId: any, validateKeystor?: boolean):
        Promise<any> => {
        let active = true;
        let data = { description, typeServiceId, wareHouseId, active };
        if (validateKeystor)
            data['validateKeystor'] = validateKeystor;
        await super.insertOne(data);
    }
    find = async (where: object): Promise<ServicesWarehouseModel[]> => await super.find(where);

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

export const servicesWarehouseRepository = new ServicesWarehouseRepository();