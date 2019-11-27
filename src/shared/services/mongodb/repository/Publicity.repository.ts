import Repository from "./repository";
import { PublicityModel } from "../model/Publicity.model";
let ObjectId = require('mongodb').ObjectId;
class PublicityRepository extends Repository {
    constructor() {
        super('Publicity');
    }
    create = async (title: string, photo: string, link?: string, photo2?: string, photo3?: string):
        Promise<any> => {
        let active = true;
        await super.insertOne({ title, photo, link, photo2, photo3, active });
    }
    find = async (where: object): Promise<PublicityModel[]> => await super.find(where);

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

export const publicityRepository = new PublicityRepository();