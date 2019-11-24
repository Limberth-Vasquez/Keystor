let MongoClient = require('mongodb').MongoClient;
import { logger } from '@services/logger';
import environment from '@environment/environment';

export class MongoService {
    private _client;
    public db;
    public async  connect() {
        this._client = await MongoClient.connect(environment.mongoUrl, {
            useNewUrlParser: true
        });
        this.db = this._client.db();
        logger.info('Mongo connection succeded');
        return this._client;
    }

    public disconnect() {
        logger.info('Mongo connection released');
        this._client.close();
    }

    public async getAutoReleasedDb(fn: Function) {
        try {
            await this.connect();
            return await fn(this.db);
        } catch (e) {
            throw e;
        } finally {
            this.disconnect();
        }
    }

}