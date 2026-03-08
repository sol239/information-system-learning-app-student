import { Component } from "~/model/Component";

export const sessionParticipantsListComponent = new Component({
    id: "session-participants-list",
    name: "Session Participants List",
    tags: ["sessions"],
    description: `Component showing the list of participants for a session.`,
    html: `
<div class="person-list">
  <div class="person-list-header">
    <span class="person-list-icon">👥</span>
    <span class="person-list-title">Účastníci</span>
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
  color: #3b82f6;
}

.person-list-names {
  font-size: 0.8rem;
  color: #374151;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  padding: 0.4rem 0.6rem;
  line-height: 1.6;
  word-break: break-word;
}
`,
    js: ``,
    sql: `SELECT p.jmeno AS jmeno, p.vek AS vek FROM ucastnici p JOIN turnusy_ucastnici sp ON p.id_ucastnika = sp.id_ucastnika WHERE sp.id_turnusu = ?`
});
