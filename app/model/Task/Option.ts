import type { GUID } from "../GUID";

export type Option = {
    id: GUID;
    text: string;
    isCorrect: boolean;
}
