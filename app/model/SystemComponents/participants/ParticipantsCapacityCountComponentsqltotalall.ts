import { Component } from "~/model/Component";

export const participantsCapacityCountComponentsqltotalall = new Component({
    id: "participants-capacity-count-sql-total-all",
    name: "Participants Capacity Count (sql-total-all)",
    tags: ["participants"],
    description: `Component for displaying capacity count for all sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT SUM(kapacita AS kapacita) as count FROM turnusy`
});
