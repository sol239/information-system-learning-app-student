import { Component } from "~/model/Component";

export const supervisorsSessionsComponent = new Component({
    id: "supervisors-sessions",
    name: "Supervisors Sessions",
    tags: ["supervisors"],
    description: `SQL for getting supervisors sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT ss.id_vedouciho AS id_vedouciho, s.id_turnusu AS id_turnusu
            FROM vedouci_turnusy ss
            JOIN turnusy s ON ss.id_turnusu = s.id_turnusu
        `
});
