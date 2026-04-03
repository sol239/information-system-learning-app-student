import type { IActivity } from "./IActivity";
import type { Component } from "../../Component";

export class RepairActivity implements IActivity {
    public isCompleted?: boolean
    public substituteAfterActivity: boolean = false

    constructor(
        public description: string,
        public activityComponents: Component[],
        public label?: string,
    ) { }  

    check(input: any): void {
        // Do nothing, isCompleted is used to remove error components, so correct ones can be displayed.
    }
}
