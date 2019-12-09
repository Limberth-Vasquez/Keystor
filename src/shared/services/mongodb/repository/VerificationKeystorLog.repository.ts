import Repository from "./repository";
import { VerificationKeystorLogModel } from "../model/VerificationKeystorLog.model";
let ObjectId = require('mongodb').ObjectId;

class VerificationKeystorLogRepository extends Repository {

    constructor() {
        super('VerificationKeystorLog');
    }
    create = async (adminID: string, wareHouseID: string, observations: string, aproved: boolean):
        Promise<any> => {
        let active = true;
        let data = {
            adminID,
            wareHouseID,
            observations,
            aproved,
            active
        };
        await super.insertOne(data);
    }

    find = async (where: object): Promise<VerificationKeystorLogModel[]> => await super.find(where);

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

export const verificationKeystorLogRepository = new VerificationKeystorLogRepository();