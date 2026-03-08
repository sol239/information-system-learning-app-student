import { Component } from "~/model/Component";

export const sessionParticipantDeleteComponent = new Component({
    id: "session-participant-delete",
    name: "Session Participant Delete",
    tags: ["sessions"],
    description: `SQL for deleting session-participant association.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM turnusy_ucastnici WHERE id_turnusu = ? AND id_ucastnika = ?`
});
