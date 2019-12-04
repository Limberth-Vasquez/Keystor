import Repository from "./repository";
import { EventModel } from "../model/Event.model";
let ObjectId = require('mongodb').ObjectId;
class EventRepository extends Repository {
    constructor() {
        super('Event');
    }
    create = async (
        nameEvent: string,
        email: string,
        phone: string,
        locationID: any,
        idUserEvent: any,
        description: string,
        fees1: Float32Array,
        createDate: Date,
        startDate: Date,
        endDate: Date,
        fees2?: Float32Array,
        fees3?: Float32Array
    ):
        Promise<any> => {
        let active = true;
        let data = {
            nameEvent,
            email,
            phone,
            locationID,
            idUserEvent,
            description,
            fees1,
            createDate,
            startDate,
            endDate,
            active
        };
        if (fees2)
            data['fees2'] = fees2;

        if (fees3)
            data['fees3'] = fees3;

        await super.insertOne(data);
    }
    find = async (where: object): Promise<EventModel[]> => await super.find(where);
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

export const eventRepository = new EventRepository();