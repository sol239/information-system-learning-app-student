import { Component } from "~/model/Component";

export const sessionParticipantsSectionComponentsql1 = new Component({
    id: "session-participants-section-sql-1",
    name: "Session Participants Section (sql-1)",
    tags: ["sessions"],
    description: `Component showing the list of participants for a session with avatars and details.`,
    html: ``,
    css: ``,
    js: ``,
    sql: `SELECT p.* FROM ucastnici p JOIN turnusy_ucastnici sp ON p.id_ucastnika = sp.id_ucastnika WHERE sp.id_turnusu = ?`
});
