export class RatingModel {
    public _id?: string;
    public description: string;
    public calification: number;
    public isPublic: boolean;
    public idWhoCreateCalification: string;
    public idRolWhoCreateCalification: string;
    public idWhoReceiveCalification: string;
    public idRolWhoReceiveCalification: string;
    public active: boolean;
}