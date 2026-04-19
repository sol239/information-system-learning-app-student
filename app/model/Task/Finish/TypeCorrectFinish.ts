import type { IFinish } from "./IFinish";

export class TypeCorrectFinish implements IFinish {

    public isComplete: boolean = false;

    constructor(
        public description: string,
        public correctAnswer: string,
        public label?: string,
    ) { }

    public evaluate(input: unknown = ""): boolean {
        this.isComplete = String(input).trim() === this.correctAnswer.trim();
        return this.isComplete;
    }
}
