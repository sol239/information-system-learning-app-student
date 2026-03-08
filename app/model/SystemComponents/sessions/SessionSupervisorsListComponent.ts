import { Component } from "~/model/Component";

export const sessionSupervisorsListComponent = new Component({
    id: "session-supervisors-list",
    name: "Session Supervisors List",
    tags: ["sessions"],
    description: `Component showing the list of supervisors for a session.`,
    html: `
<div class="person-list">
  <div class="person-list-header">
    <span class="person-list-icon">🧑‍🏫</span>
    <span class="person-list-title">Vedoucí</span>
  </div>
  <div class="person-list-names">{{ jmeno }}</div>
</div>
`,
    css: `.person-list {
  margin-top: 0.75rem;
}

.person-list-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.person-list-icon {
  font-size: 0.9rem;
}

.person-list-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #16a34a;
}

.person-list-names {
  font-size: 0.8rem;
  color: #374151;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.375rem;
  padding: 0.4rem 0.6rem;
  line-height: 1.6;
  word-break: break-word;
}
`,
    js: ``,
    sql: `SELECT s.jmeno AS jmeno FROM vedouci s JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho WHERE ss.id_turnusu = ?`
});
