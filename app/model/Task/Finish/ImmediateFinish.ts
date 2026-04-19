import type { FinishEvaluationContext, IFinish } from "./IFinish";

export class ImmediateFinish implements IFinish {

    public isComplete: boolean = false;
    
    constructor(
            public description: string,
            public label?: string,
        ) { }
    
    public evaluate(_input?: unknown, context?: FinishEvaluationContext): boolean {
        this.isComplete = Boolean(context?.activityCompleted);
        return this.isComplete;
    }
}
