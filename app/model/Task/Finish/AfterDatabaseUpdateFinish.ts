import type { IFinish } from "./IFinish";

export class AfterDatabaseUpdateFinish implements IFinish {

    public isComplete: boolean = false;
    
    constructor(
            public description: string,
            public label?: string,
        ) { }
    
    public evaluate(): boolean {
        return false;
    }
}