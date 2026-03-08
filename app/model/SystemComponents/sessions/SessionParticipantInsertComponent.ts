import { Component } from "~/model/Component";

export const sessionParticipantInsertComponent = new Component({
    id: "session-participant-insert",
    name: "Session Participant Insert",
    tags: ["sessions"],
    description: `SQL for inserting session-participant association.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO turnusy_ucastnici (id_turnusu, id_ucastnika) VALUES (?, ?)`
});
