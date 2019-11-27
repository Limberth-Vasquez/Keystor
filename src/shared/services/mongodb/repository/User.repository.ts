import Repository from "./repository";
import { UserModel } from "../model/User.model";
import { LocationModel } from "../model/Location.model";
import { RolModel } from "../model/Rol.model";
let ObjectId = require('mongodb').ObjectId;
class UserRepository extends Repository {
    constructor() {
        super('User');
    }
    create = async (
        user: string,
        name: string,
        lastName: string,
        secondLastName: string,
        email: string,
        locationID: LocationModel,
        rolID: RolModel,       
        phone?: string,
        personalID?: string):
        Promise<any> => {
        let active = true;
        await super.insertOne({
            user,
            name,
            lastName,
            secondLastName,
            email,
            locationID,
            rolID,       
            phone,
            personalID,
            active
        });
    }
    find = async (where: object): Promise<UserModel[]> => await super.find(where);

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

export const userRepository = new UserRepository();