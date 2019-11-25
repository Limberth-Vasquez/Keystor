import Repository from "./repository";
import { TermsAndConditionsModel } from "../model/TermsAndConditions.model";
let ObjectId = require('mongodb').ObjectId;
class TermsAndConditionsRepository extends Repository {
    constructor() {
        super('TermsAndConditions');
    }

    create = async (title: string, description: string):
        Promise<any> => {
        let active = true;
        await super.insertOne({ title, description, active });
    }
    find = async (where: object): Promise<TermsAndConditionsModel[]> => await super.find(where);

    async update(set: object, where: object): Promise<any> {
        return await super.updateOne(set, where)
    }

    delete = async (_id: string):
        Promise<any> => {
        _id = new ObjectId(_id)
        let active = true;
        return await this.update({ active }, { _id }).then(result => {
            return { rows: result.length, result };
        })
    }
}

export const termsAndConditionsModel = new TermsAndConditionsModel();