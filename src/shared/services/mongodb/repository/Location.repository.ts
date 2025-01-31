import Repository from "./repository";
import { LocationModel } from "../model/Location.model";
let ObjectId = require('mongodb').ObjectId;
class LocationRepository extends Repository {
    constructor() {
        super('Location');
    }
    create = async (pointX: string,
        pointY: string,
        name: string,
        address: string
    ):
        Promise<any> => {
        let active = true;
        let data = {
            pointX,
            pointY,
            name,
            address,
            active
        };
        await super.insertOne(data);
    }
    find = async (where: object): Promise<LocationModel[]> => await super.find(where);
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

export const locationRepository = new LocationRepository();