import { Component } from "~/model/Component";

export const sessionSupervisorsCountComponent = new Component({
    id: "session-supervisors-count",
    name: "Session Supervisors Count",
    tags: ["sessions"],
    description: `Component showing the count of supervisors for a session.`,
    html: `
<div class="count-badge">
  <span class="count-icon">🧑‍🏫</span>
  <div class="count-content">
    <span class="count-number">{{ count }}</span>
    <span class="count-label">vedoucích</span>
  </div>
</div>
`,
    css: `.count-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
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
  color: #15803d;
  line-height: 1.2;
}

.count-label {
  font-size: 0.75rem;
  color: #16a34a;
  font-weight: 500;
}
`,
    js: ``,
    sql: `SELECT COUNT(*) as count FROM vedouci s JOIN vedouci_turnusy ss ON s.id_vedouciho = ss.id_vedouciho WHERE ss.id_turnusu = ?`
});
