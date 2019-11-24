import { TypeServiceModel } from "./TypeService.model";

export class ServicesWarehouseModel{
    public _id?: string;
    public description: string;
    public typeServiceId: TypeServiceModel;
    public wareHouseId: any;
    public validateKeystor: boolean;
}