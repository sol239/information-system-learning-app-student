import { Component } from "~/model/Component";

export const sessionParticipantsCountComponent = new Component({
    id: "session-participants-count",
    name: "Session Participants Count",
    tags: ["sessions"],
    description: `Component showing the count of participants for a session.`,
    html: `
<div class="count-badge">
  <span class="count-icon">👥</span>
  <div class="count-content">
    <span class="count-number">{{ count }}</span>
    <span class="count-label">účastníků</span>
  </div>
</div>
`,
    css: `.count-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
}

.count-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.count-content {
  display: flex;
  flex-direction: column;
}

.count-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d4ed8;
  line-height: 1.2;
}

.count-label {
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 500;
}
`,
    js: ``,
    sql: `SELECT COUNT(*) as count FROM ucastnici p JOIN turnusy_ucastnici sp ON p.id_ucastnika = sp.id_ucastnika WHERE sp.id_turnusu = ?`
});
