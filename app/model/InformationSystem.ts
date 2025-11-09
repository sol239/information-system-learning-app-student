import DbHandler from "~/composables/DbHandler";
import { Participant } from "./Participant";
import { Task } from "./Task";

export interface Table<T = any> {
  name: string;
  data: T[];
}

export class InformationSystem {

  // TODO: use db attribute for IS
  public db: DbHandler | null;

  constructor(
    public id: number,
    public directory: string,
    public name: string,
    public description: string,
    public tables: Table[],
    public tasks: Task[] = [],
    public configData: any,
    public dbNumber: number = 0,
    public dbInitialized: boolean = false
  ) {
    // Don't initialize db here - it will be set later during hydration
    this.db = null as any;
  }

  public static async databaseInitStatic(json: any) {
    const dbHandler = await DbHandler.fromJSON(json);
    console.log("Database initialized for Information System (static):", json.name);
    return dbHandler;
  }

  public async databaseInit(json: any): Promise<void> {
    console.log("Initializing database for Information System:", this.name);
    if (!this.db) {
      this.db = new DbHandler();
    }
    await this.db.init(json);
    this.dbInitialized = true;
    console.log("Database initialized for Information System:", this.name);
  }

  public async databaseInitNew(json: any, csvData: Record<string, string>): Promise<void> {
    console.log("Initializing database for Information System (new):", this.name);
    if (!this.db) {
      this.db = new DbHandler();
    }
    await this.db.init(json, csvData);
    this.dbInitialized = true;
    console.log("Database initialized for Information System (new):", this.name);
  }

  static fromJSON(json: any): InformationSystem {
    // Parse tables
    const tables: Table[] = (json.tables || []).map((table: any) => ({
      name: table.name,
      data: table.data,
    }));

    // Parse tasks
    const tasks: Task[] = (json.tasks || []).map((task: any) =>
      Task.fromJSON(task)
    );

    return new InformationSystem(
      json.id,
      json.directory || "",
      json.name,
      json.description,
      tables,
      tasks,
      json
    );
  }
}