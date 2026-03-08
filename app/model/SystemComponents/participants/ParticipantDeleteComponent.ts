import { Component } from "~/model/Component";

export const participantDeleteComponent = new Component({
    id: "participant-delete",
    name: "Participant Delete",
    tags: ["participants"],
    description: `SQL for deleting a participant.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM ucastnici WHERE id_ucastnika = ?`
});
