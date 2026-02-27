import type {IComponent} from "~/model/IComponent";

export interface IActivityTask {
    Id: string;
    Title: string;
    Description: string;
    IsSolved: boolean;
    IsEvaluatable: boolean;
    TaskComponents: IComponent[];
}