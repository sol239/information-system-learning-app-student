import { Component } from "~/model/Component";

export const sessionSupervisorInsertComponent = new Component({
    id: "session-supervisor-insert",
    name: "Session Supervisor Insert",
    tags: ["sessions"],
    description: `SQL for inserting session-supervisor association.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO vedouci_turnusy (id_turnusu, id_vedouciho) VALUES (?, ?)`
});
