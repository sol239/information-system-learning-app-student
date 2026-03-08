import { Component } from "~/model/Component";

export const sessionSupervisorsSectionComponentsql2 = new Component({
    id: "session-supervisors-section-sql-2",
    name: "Session Supervisors Section (sql-2)",
    tags: ["sessions"],
    description: `Component showing the list of supervisors for a session with avatars and contact details.`,
    html: ``,
    css: ``,
    js: ``,
    sql: `SELECT COUNT(*) as count FROM vedouci s JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho WHERE ss.id_turnusu = ?`
});
