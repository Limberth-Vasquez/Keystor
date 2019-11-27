import Repository from "./repository";
import { NotificationModel } from "../model/Notification.model";
let ObjectId = require('mongodb').ObjectId;
class NotificationRepository extends Repository {
    constructor() {
        super('Notification');
    }
    create = async (userNotify: any, userNotified: any, seenByUser:string, eventId?:any,warehouseId?:any):
        Promise<any> => {
        let active = true;
        await super.insertOne({ userNotify, userNotified,seenByUser,eventId,warehouseId, active });
    }
    find = async (where: object): Promise<NotificationModel[]> => await super.find(where);
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

export const notificationRepository = new NotificationRepository();