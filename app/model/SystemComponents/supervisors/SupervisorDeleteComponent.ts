import { Component } from "~/model/Component";

export const supervisorDeleteComponent = new Component({
    id: "supervisor-delete",
    name: "Supervisor Delete",
    tags: ["supervisors"],
    description: `SQL for deleting a supervisor.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM vedouci WHERE id_vedouciho = ?`
});
