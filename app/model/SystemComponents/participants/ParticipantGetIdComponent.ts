import { Component } from "~/model/Component";

export const participantGetIdComponent = new Component({
    id: "participant-get-id",
    name: "Participant Get ID",
    tags: ["participants"],
    description: `SQL for getting participant ID after insert.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT id_ucastnika AS id_ucastnika FROM ucastnici
            WHERE jmeno = ? AND email = ?
            ORDER BY id_ucastnika DESC LIMIT 1
        `
});
