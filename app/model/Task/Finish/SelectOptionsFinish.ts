import type { IFinish } from "./IFinish";
import type { Option } from "../Option";

export class SelectOptionsFinish implements IFinish {

    public isComplete: boolean = false;

    constructor(
        public description: string,
        public label?: string,
        public options: Option[] = []

    ) { }

    public evaluate(): boolean {
        return false;
    }
}