import { Component } from "~/model/Component";

export const participantsCountComponent = new Component({
    id: "participants-count",
    name: "Participants Count",
    tags: ["participants"],
    description: `SQL for counting participants.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT COUNT(*) as count FROM ucastnici`
});
