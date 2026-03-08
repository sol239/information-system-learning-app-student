import { Component } from "~/model/Component";

export const participantsSampleComponent = new Component({
    id: "participants-sample",
    name: "Participants Sample",
    tags: ["participants"],
    description: `SQL for getting participants sample.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_ucastnika AS id_ucastnika, jmeno AS jmeno, email FROM ucastnici ORDER BY id_ucastnika DESC LIMIT 3`
});
