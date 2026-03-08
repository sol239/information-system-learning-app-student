import { Component } from "~/model/Component";

export const sessionSupervisorsSectionComponentsql1 = new Component({
    id: "session-supervisors-section-sql-1",
    name: "Session Supervisors Section (sql-1)",
    tags: ["sessions"],
    description: `Component showing the list of supervisors for a session with avatars and contact details.`,
    html: ``,
    css: ``,
    js: ``,
    sql: `SELECT s.* FROM vedouci s JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho WHERE ss.id_turnusu = ?`
});
