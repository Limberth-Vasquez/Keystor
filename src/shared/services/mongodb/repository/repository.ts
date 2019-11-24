import { MongoService } from "../mongo.service";

class Repository{
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
            console.log('Document saved');
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
            console.log('Document saved');
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
            updateOne(where, { $set: set },{ upsert: false, multi: true}).then(r=>{
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
                .updateMany(where, { $set: documents});
            console.log('Document updated');
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
            return await mongoService.db.collection(this.collectionName).
            updateOne(where, { $set: set },{ upsert: true, multi: true});
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
            console.log('Document saved');
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