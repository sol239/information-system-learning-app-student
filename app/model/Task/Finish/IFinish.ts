import { FinishType } from "./FinishType";

export interface IFinish {
    description: string;
    label?: string;
    isComplete: boolean;
}