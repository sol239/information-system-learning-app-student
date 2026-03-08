import { Component } from "~/model/Component";

export const participantsCapacityCountTotalSessionComponent = new Component({
    id: "participants-capacity-count-total-session",
    name: "Participants Capacity Count Total (Session)",
    tags: ["participants"],
    description: `Component for displaying total capacity count for a single session.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT kapacita AS kapacita as count FROM turnusy WHERE id_turnusu = ?`
});
