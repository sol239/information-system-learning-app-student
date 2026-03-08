import { Component } from "~/model/Component";

export const sessionsListComponent = new Component({
    id: "sessions-list",
    name: "Sessions List",
    tags: ["sessions"],
    description: `SQL for getting all sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT id_turnusu AS id_turnusu, datum_od AS datum_od, datum_do AS datum_do, kapacita AS kapacita
            FROM turnusy
            ORDER BY id_turnusu
        `
});
