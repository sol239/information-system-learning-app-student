import { Component } from "~/model/Component";

export const supervisorsCapacityCountComponentsqlcurrentall = new Component({
    id: "supervisors-capacity-count-sql-current-all",
    name: "Supervisors Capacity Count (sql-current-all)",
    tags: ["supervisors"],
    description: `Component for displaying supervisors count vs capacity for all sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT COUNT(*) as count
            FROM vedouci s
            JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho
        `
});
