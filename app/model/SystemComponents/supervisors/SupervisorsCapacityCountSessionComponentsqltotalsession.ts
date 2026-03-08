import { Component } from "~/model/Component";

export const supervisorsCapacityCountSessionComponentsqltotalsession = new Component({
    id: "supervisors-capacity-count-session-sql-total-session",
    name: "Supervisors Capacity Count (Session) (sql-total-session)",
    tags: ["supervisors"],
    description: `Component for displaying supervisors count vs capacity for a single session.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT kapacita AS kapacita as count FROM turnusy WHERE id_turnusu = ?`
});
