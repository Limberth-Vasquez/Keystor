import Repository from "./repository";
import { WarehouseModel } from "../model/Warehouse.model";
import { LocationModel } from "../model/Location.model";
let ObjectId = require('mongodb').ObjectId;
class WarehouseRepository extends Repository {
    constructor() {
        super('Warehouse');
    }
    create = async (
        name: string,
        email: string,
        locationID: LocationModel,
        country: string,
        wareHouseOwnerID: any,
        timeOpen: Date,
        timeClose: Date,
        capacityPerPallet: Float32Array,
        capacityPerSpace: Float32Array,
        fees1: Float32Array,
        fees2?: Float32Array,
        fees3?: Float32Array,
        photo?: string,
        photo2?: string,
        photo3?: string):
        Promise<any> => {
        let active = true;
        await super.insertOne({
            name,
            email,
            locationID,
            country,
            wareHouseOwnerID,
            timeOpen,
            timeClose,
            capacityPerPallet,
            capacityPerSpace,
            fees1,
            fees3,
            fees2,
            photo,
            photo2,
            photo3,
            active
        });
    }
    find = async (where: object): Promise<WarehouseModel[]> => await super.find(where);

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

export const warehouseRepository = new WarehouseRepository();