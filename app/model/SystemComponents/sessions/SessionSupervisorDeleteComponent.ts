import { Component } from "~/model/Component";

export const sessionSupervisorDeleteComponent = new Component({
    id: "session-supervisor-delete",
    name: "Session Supervisor Delete",
    tags: ["sessions"],
    description: `SQL for deleting session-supervisor association.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM vedouci_turnusy WHERE id_turnusu = ? AND id_vedouciho = ?`
});
