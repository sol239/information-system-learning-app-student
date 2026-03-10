import type { VariableType } from "./types/VariableType";

export class Variable {
    constructor(public name: string, public variable: VariableType| VariableType[]) {}
}

export class ComponentVariables {
    public generalVariables: Variable[] = [];
    public sqlVariables: Variable[] = [];
    public jsVariables: Variable[] = [];
}