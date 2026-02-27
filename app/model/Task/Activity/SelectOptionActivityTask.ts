import type { IActivityTask } from "./IActivityTask";
import type {IComponent} from "~/model/IComponent";

export class SelectOptionActivityTask implements IActivityTask {
    public Id: string;
    public Title: string;
    public Description: string;
    public IsSolved: boolean;
    public IsEvaluatable: boolean;
    public TaskComponents: IComponent[];

    private constructor(
        Id: string,
        Title: string,
        Description: string,
        TaskComponents: IComponent[],
    ) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.IsSolved = false;
        this.IsEvaluatable = true;
        this.TaskComponents = TaskComponents;
    }

    public static fromJson(json: {
        Id: string;
        Title: string;
        Description: string;
        TaskComponents: IComponent[];
    }): SelectOptionActivityTask {
        return new SelectOptionActivityTask(json.Id, json.Title, json.Description, json.TaskComponents);
    }
    
}