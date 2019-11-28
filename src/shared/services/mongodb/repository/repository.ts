import { MongoService } from "../mongo.service";
import { logger } from "@shared/services/logger";

class Repository {
    public collectionName: string;
    constructor(_collectionName: string) {
        this.collectionName = _collectionName;
    }

    public async find(where = {}): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            return await mongoService.db.collection(this.collectionName).find(where).toArray();
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }
    }
    public async insertOne(document: object): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            let result = await mongoService.db.collection(this.collectionName).insertOne(document);
            logger.info('Document saved into collection name ' + this.collectionName);
            return result['ops'][0]['_id'];
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }
    }

    public async insertMany(documents: object[]): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            let result = await mongoService.db.collection(this.collectionName).insertMany(documents);
            logger.info('Saved documents into collection name ' + this.collectionName);
            return result['ops'][0]['_id'];
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }
    }

    public async updateOne(set: object, where: object): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            return await mongoService.db.collection(this.collectionName).
                updateOne(where, { $set: set }, { upsert: false, multi: true }).then(r => {
                    return r.modifiedCount;
                });
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }

    }

    public async updateMany(documents: object, where: object): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            let result = await mongoService.db.collection(this.collectionName)
                .updateMany(where, { $set: documents });
            logger.info('Updated documents into collection name ' + this.collectionName);
            return result;
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }
    }

    public async upsertOne(set: object, where: object): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            let result = await mongoService.db.collection(this.collectionName).
                updateOne(where, { $set: set }, { upsert: true, multi: true });
            logger.info('Document update into collection name ' + this.collectionName)
            return result;
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }

    }
    public async deleteOne(where: object): Promise<any> {
        let mongoService = new MongoService();
        try {
            await mongoService.connect();
            let result = await mongoService.db.collection(this.collectionName).deleteOne(where);
            logger.info('Document deleted into collection name ' + this.collectionName);
            return result['ops'][0]['_id'];
        } catch (e) {
            throw e;
        }
        finally {
            mongoService.disconnect();
        }
    }

}

export default Repository;