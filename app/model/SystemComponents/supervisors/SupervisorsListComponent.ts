import { Component } from "~/model/Component";

export const supervisorsListComponent = new Component({
    id: "supervisors-list",
    name: "Supervisors List",
    tags: ["supervisors"],
    description: `SQL for fetching supervisors list.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT * FROM vedouci`
});
