import Repository from "./repository";
import { RolModel } from "../model/Rol.model";
let ObjectId = require('mongodb').ObjectId;
class RolRepository extends Repository {
    constructor() {
        super('Rol');
    }
    create = async (name: string):
        Promise<any> => {
        let active = true;
        let data = {
            name,
            active
        };
        await super.insertOne(data);
    }
    find = async (where: object): Promise<RolModel[]> => await super.find(where);

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

export const rolRepository = new RolRepository();