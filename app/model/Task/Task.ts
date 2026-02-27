import { ActivityType } from "./Activity/ActivityType";
import { FinishType } from "./Finish/FinishType";

export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public componentsRepaired: boolean = false,
    public completed: boolean = false,
    public activityDescription: string = '',
    public activityType: ActivityType,
    public finishDescription: string = '',
    public finishType: FinishType = FinishType.AFTER_ACTIVITY,
    public elementClass: Set<string> = new Set(),
    public answer: string = '',
    public round: number = 1,
    public isEditable: boolean = false,
    public status: string = '',
    public errorComponents: any[] = [],
    public componentsIdsToFind: string[] = [],
    public feedback: string = '',
    public pointsReward: number = 0,
    public failPenalty: number = 1
  ) { }

  static fromJSON(json: any): Task {
    // elementClass: array or string → Set
    let elementClassSet: Set<string>;
    if (Array.isArray(json.elementClass)) {
      elementClassSet = new Set(json.elementClass);
    } else if (typeof json.elementClass === 'string') {
      elementClassSet = json.elementClass ? new Set([json.elementClass]) : new Set();
    } else {
      elementClassSet = new Set();
    }

    // errorComponents: support both keys
    const errorComponents = json['error-components'] ?? json.errorComponents ?? [];

    // isEditable: support both keys
    const isEditable = json['is_editable'] ?? json.isEditable ?? false;

    // Handle activityType and finishType from JSON
    const activityType = json.activityType ?? json.type ?? ActivityType.REPAIR;
    const finishType = json.finishType ?? json.evaluationType ?? FinishType.AFTER_ACTIVITY;

    // Handle descriptions
    const activityDescription = json.activityDescription ?? '';
    const finishDescription = json.finishDescription ?? json.evaluationDescription ?? '';

    return new Task(
      json.id,
      json.title,
      json.description,
      json.componentsRepaired ?? false,
      json.completed ?? false,
      activityDescription,
      activityType as ActivityType,
      finishDescription,
      finishType as FinishType,
      elementClassSet,
      json.answer ?? '',
      json.round ?? 1,
      isEditable,
      json.status ?? '',
      errorComponents,
      json.componentsIdsToFind ?? [],
      json.feedback ?? '',
      json.pointsReward ?? 0,
      json.failPenalty ?? 1
    );
  }

}
