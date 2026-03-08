import { Component } from "~/model/Component";

export const participantsSessionsComponent = new Component({
    id: "participants-sessions",
    name: "Participants Sessions",
    tags: ["participants"],
    description: `SQL for getting participants sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT ps.id_ucastnika AS id_ucastnika, s.id_turnusu AS id_turnusu
            FROM turnusy_ucastnici ps
            JOIN turnusy s ON ps.id_turnusu = s.id_turnusu
        `
});
