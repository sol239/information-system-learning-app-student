import { Component } from "~/model/Component";

export const participantsListComponent = new Component({
    id: "participants-list",
    name: "Participants List",
    tags: ["participants"],
    description: `SQL for fetching participants list.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT * FROM ucastnici`
});
