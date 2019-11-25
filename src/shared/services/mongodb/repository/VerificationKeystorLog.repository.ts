import Repository from "./repository";
import { VerificationKeystorLogModel } from "../model/VerificationKeystorLog.model";
let ObjectId = require('mongodb').ObjectId;
class VerificationKeystorLogRepository extends Repository {
    constructor() {
        super('VerificationKeystorLog');
    }
    createKeystorLog = async (adminID: string, wareHouseID: string, observations: string, aproved: boolean):
        Promise<string> => await super.insertOne({ adminID, wareHouseID, observations, aproved });

    find = async (where: object): Promise<VerificationKeystorLogModel[]> => await super.find(where);

    getKeystorLog = async (_id: string): Promise<any> => {
        _id = new ObjectId(_id)
        await super.find({ _id }).then(arr => arr.shift());
    }

    async updateOne(set: object, where: object): Promise<any> {
        return await super.updateOne(set, where)
    }

    deleteKeystorLog = async (_id: string):
        Promise<any> => {
        _id = new ObjectId(_id)
        let active = true;
        return await this.updateOne({ active }, { _id }).then(result => {
            return { rows: result.length, result };
        })
    }
}

export const verificationKeystorLogRepository = new VerificationKeystorLogRepository();