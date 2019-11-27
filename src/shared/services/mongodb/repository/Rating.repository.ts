import Repository from "./repository";
import { RatingModel } from "../model/Rating.model";
let ObjectId = require('mongodb').ObjectId;
class RatingRepository extends Repository {
    constructor() {
        super('Rating');
    }
    create = async (
        description: string,
        calification: number, 
        isPublic: boolean, 
        idWhoCreateCalification: string, 
        idRolWhoCreateCalification: string, 
        idWhoReceiveCalification: string, 
        idRolWhoReceiveCalification: string
        ):
        Promise<any> => {
        let active = true;
        await super.insertOne({ 
            description, 
            calification, 
            isPublic, 
            idWhoCreateCalification,
            idRolWhoCreateCalification,
            idWhoReceiveCalification,
            idRolWhoReceiveCalification, 
            active 
        });
    }
    find = async (where: object): Promise<RatingModel[]> => await super.find(where);

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

export const ratingRepository = new RatingRepository();