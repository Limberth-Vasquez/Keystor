import Repository from "./repository";
import { AboutUsModel } from "../model/AboutUs.model";
let ObjectId = require('mongodb').ObjectId;
class AboutUsRepository extends Repository {
    constructor() {
        super('AboutUs');
    }
    create = async (title: string, description: string):
        Promise<any> => {
        let active = true;
        let data = {
            title,
            description,
            active
        };
        await super.insertOne(data);
    }
    find = async (where: object): Promise<AboutUsModel[]> => await super.find(where);

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

export const aboutUsRepository = new AboutUsRepository();