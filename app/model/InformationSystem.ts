import DbHandler from "~/composables/DbHandler";
import { Participant } from "./Participant";
import { Task } from "./Task";
import { IndexedDbHandler } from "~/utils/IndexedDbHandler";

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
    // Try to load from IndexedDB first
    if (json.id) {
      try {
        const buffer = await IndexedDbHandler.loadSystemDB(json.id);
        if (buffer) {
          console.log("Loading database from IndexedDB for system:", json.name);
          const dbHandler = await DbHandler.fromBuffer(buffer, json);
          return dbHandler;
        }
      } catch (e) {
        console.error("Failed to load from IndexedDB", e);
      }
    }

    const dbHandler = await DbHandler.fromJSON(json);
    console.log("Database initialized for Information System (static):", json.name);

    // Save to IndexedDB for next time
    if (json.id) {
      try {
        const exported = dbHandler.exportDatabase();
        await IndexedDbHandler.saveSystemDB(json.id, exported);
      } catch (e) {
        console.error("Failed to save to IndexedDB", e);
      }
    }

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

    // Save to IndexedDB
    try {
      const exported = this.db.exportDatabase();
      await IndexedDbHandler.saveSystemDB(this.id, exported);
    } catch (e) {
      console.error("Failed to save to IndexedDB", e);
    }
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