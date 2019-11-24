import Repository from "./repository";
class VerificationKeystorLogRepository extends Repository {
    constructor() {
        super('VerificationKeystorLog');
    }
    createKeystorLog = async (adminID: string, wareHouseID: string, observations: string, aproved: boolean):
        Promise<string> => await super.insertOne({ adminID, wareHouseID, observations, aproved});
}

export const verificationKeystorLogRepository = new VerificationKeystorLogRepository();