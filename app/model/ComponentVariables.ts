export class ComponentVariables {
    constructor(
        public generalVariables: Record<string, ColumnType | ColumnType[]>,
        public sqlVariables: Record<string, ColumnType | ColumnType[]>,
        public jsVariables: Record<string, ColumnType | ColumnType[]>
    ) { }

}