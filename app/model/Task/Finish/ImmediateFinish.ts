import type { IFinish } from "./IFinish";

export class ImmediateFinish implements IFinish {

    public isComplete: boolean = false;
    
    constructor(
            public description: string,
            public label?: string,
        ) { }
    
    public evaluate(): boolean {
        return false;
    }
}