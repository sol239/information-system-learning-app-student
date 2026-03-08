import { Component } from "~/model/Component";

export const participantsCapacityCountComponentsqlcurrentall = new Component({
    id: "participants-capacity-count-sql-current-all",
    name: "Participants Capacity Count (sql-current-all)",
    tags: ["participants"],
    description: `Component for displaying capacity count for all sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `
        SELECT COUNT(*) as count
        FROM ucastnici p
        JOIN turnusy_ucastnici sp ON p.id_ucastnika = sp.id_ucastnika
    `
});
