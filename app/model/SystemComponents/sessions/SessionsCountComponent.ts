import { Component } from "~/model/Component";

export const sessionsCountComponent = new Component({
    id: "sessions-count",
    name: "Sessions Count",
    tags: ["sessions"],
    description: `SQL for counting sessions.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT COUNT(*) as count FROM turnusy`
});
