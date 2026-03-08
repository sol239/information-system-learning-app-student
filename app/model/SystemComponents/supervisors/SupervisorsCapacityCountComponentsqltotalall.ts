import { Component } from "~/model/Component";

export const supervisorsCapacityCountComponentsqltotalall = new Component({
    id: "supervisors-capacity-count-sql-total-all",
    name: "Supervisors Capacity Count (sql-total-all)",
    tags: ["supervisors"],
    description: `Component for displaying supervisors count vs capacity for all sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT SUM(kapacita AS kapacita) as count FROM turnusy`
});
