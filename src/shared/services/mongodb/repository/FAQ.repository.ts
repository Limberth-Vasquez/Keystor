import Repository from "./repository";
import { FAQModel } from "../model/FAQ.model";
let ObjectId = require('mongodb').ObjectId;
class FAQRepository extends Repository {
    constructor() {
        super('FAQ');
    }
    create = async (question: string, answer: string):
        Promise<any> => {
        let active = true;
        let data = {
            question,
            answer,
            active
        };
        await super.insertOne(data);
    }
    find = async (where: object): Promise<FAQModel[]> => await super.find(where);
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

export const fAQRepository = new FAQRepository();