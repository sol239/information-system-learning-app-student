import type { IActivity } from "./Activity/IActivity";
import { ActivityType } from "./Activity/ActivityType";
import { RepairActivity } from "./Activity/RepairActivity";
import { SelectActivity } from "./Activity/SelectActivity";
import { SelectOptionsActivity } from "./Activity/SelectOptionsActivity";
import { FinishType } from "./Finish/FinishType";
import type { GUID } from "../GUID";
import { TaskStatus } from "./TaskStatus";
import { Component } from "../Component";

export class Task {
  constructor(
    public id: GUID,
    public title: string,
    public description: string,

    public componentsRepaired: boolean = false,
    public completed: boolean = false,

    public activity?: IActivity,

    public finishDescription: string = '',
    public finishType: FinishType = FinishType.IMMEDIATE,

    public round: number = 1,
    
    public status: TaskStatus = TaskStatus.NOT_STARTED,

    public feedback: string = '',

    public pointsReward: number = 0,
    public failPenalty: number = 1,

    public activityType: ActivityType = ActivityType.REPAIR,
    public answer: string = "",
    public errorComponents: Component[] = [],
    public isEditable: boolean = false,
    public isSubstituted: boolean = false
  ) { }

  public static fromJSON(data: any): Task {
    const activityType = Task.parseActivityType(data?.activityType ?? data?.type ?? data?.kind);
    const finishType = Task.parseFinishType(data?.finishType);
    const status = Task.parseStatus(data?.status);
    const errorComponents = Task.parseComponents(data?.errorComponents ?? data?.["error-components"]);

    const task = new Task(
      String(data?.id ?? "") as GUID,
      data?.title ?? "",
      data?.description ?? "",
      data?.componentsRepaired ?? false,
      data?.completed ?? status === TaskStatus.COMPLETED,
      Task.createActivity(activityType, data?.activity, data?.description ?? "", errorComponents, data?.substituteAfterActivity ?? data?.activity?.substituteAfterActivity ?? false),
      data?.finishDescription ?? "",
      finishType,
      Number(data?.round ?? 1),
      status,
      data?.feedback ?? "",
      Number(data?.pointsReward ?? 0),
      Number(data?.failPenalty ?? 1),
      activityType,
      data?.answer ?? "",
      errorComponents,
      data?.isEditable ?? data?.is_editable ?? false,
      data?.isSubstituted ?? false
    );

    if (data?.finish) {
      (task as any).finish = {
        label: data.finish.label,
        description: data.finish.description,
        options: Array.isArray(data.finish.options) ? data.finish.options : undefined,
        correctAnswer: data.finish.correctAnswer ?? undefined,
      };
    }

    return task;
  }

  private static parseComponents(data: any): Component[] {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((component: any) => {
      if (component?.variables) {
        return Component.fromJSON({
          id: component.id ?? "",
          name: component["error-component-name"] ?? component.name ?? component.id ?? "",
          description: component.description ?? "",
          html: component.variables.html ?? "",
          css: component.variables.css ?? "",
          js: component.variables.js ?? "",
          js_click: component.variables.js_click ?? "",
          sql: Task.normalizeSql(component.variables.sql),
          sql_click: component.variables.sql_click ?? {},
          tags: component.tags ?? [],
          edited: component.edited ?? false,
        });
      }

      return Component.fromJSON(component);
    });
  }

  private static normalizeSql(sql: unknown): Record<string, string> {
    if (typeof sql === "string") {
      return { default: sql };
    }

    if (sql && typeof sql === "object") {
      return sql as Record<string, string>;
    }

    return {};
  }

  private static createActivity(
    activityType: ActivityType,
    activity: any,
    description: string,
    activityComponents: Component[],
    substituteAfterActivity: boolean = false
  ): IActivity {
    const activityDescription = activity?.description ?? description;
    const parsedComponents = Task.parseComponents(activity?.activityComponents);
    const components = parsedComponents.length > 0 ? parsedComponents : activityComponents;
    const label = activity?.label;

    const activityOptions = Array.isArray(activity?.options) ? activity.options : [];

    let instance: IActivity;
    switch (activityType) {
      case ActivityType.SELECT:
        instance = new SelectActivity(activityDescription, components, label);
        break;
      case ActivityType.SELECT_OPTIONS:
        instance = new SelectOptionsActivity(activityDescription, components, label, activityOptions);
        break;
      case ActivityType.REPAIR:
      default:
        instance = new RepairActivity(activityDescription, components, label);
    }
    instance.substituteAfterActivity = substituteAfterActivity;
    return instance;
  }

  private static parseActivityType(value: unknown): ActivityType {
    if (value === ActivityType.SELECT || value === ActivityType.SELECT_OPTIONS || value === ActivityType.REPAIR) {
      return value;
    }

    return ActivityType.REPAIR;
  }

  private static parseFinishType(value: unknown): FinishType {
    if (
      value === FinishType.IMMEDIATE ||
      value === FinishType.AFTER_DATABASE_UPDATE ||
      value === FinishType.SELECT_OPTIONS ||
      value === FinishType.TYPE_CORRECT
    ) {
      return value;
    }

    return FinishType.IMMEDIATE;
  }

  private static parseStatus(value: unknown): TaskStatus {
    if (value === TaskStatus.IN_PROGRESS || value === "active") {
      return TaskStatus.IN_PROGRESS;
    }

    if (value === TaskStatus.COMPLETED || value === "completed") {
      return TaskStatus.COMPLETED;
    }

    return TaskStatus.NOT_STARTED;
  }

}
