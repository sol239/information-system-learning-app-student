import { Component } from "~/model/Component";

export const supervisorsCapacityCountSessionComponentsqlcurrentsession = new Component({
    id: "supervisors-capacity-count-session-sql-current-session",
    name: "Supervisors Capacity Count (Session) (sql-current-session)",
    tags: ["supervisors"],
    description: `Component for displaying supervisors count vs capacity for a single session.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT COUNT(*) as count
            FROM vedouci s
            JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho
            WHERE ss.id_turnusu = ?
        `
});
