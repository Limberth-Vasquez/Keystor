import { ContractStatusModel } from "./ContractStatus.model";

export class ContractModel {
    public _id?: string;
    public contractId: string;
    public warehouseId: any;
    public userClientID: any;
    public name: string;
    public createDate: Date;
    public startDate: Date;
    public endDate: string;
    public costValue: string;
    public typeService: any;
    public status: ContractStatusModel;
    public active: boolean;
    public aprovedKeystor: boolean;
    public description: string;
}
