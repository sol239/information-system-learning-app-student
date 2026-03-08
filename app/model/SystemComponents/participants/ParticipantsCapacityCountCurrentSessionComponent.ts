import { Component } from "~/model/Component";

export const participantsCapacityCountCurrentSessionComponent = new Component({
    id: "participants-capacity-count-current-session",
    name: "Participants Capacity Count Current (Session)",
    tags: ["participants"],
    description: `Component for displaying current capacity count for a single session.`,
    html: "",
    css: "",
    js: "",
    sql: `
        SELECT COUNT(*) as count
        FROM ucastnici p
        JOIN turnusy_ucastnici sp ON p.id_ucastnika = sp.id_ucastnika
        WHERE sp.id_turnusu = ?
    `
});
