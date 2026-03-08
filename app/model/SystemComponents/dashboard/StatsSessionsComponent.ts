import { Component } from "~/model/Component";

export const statsSessionsComponent = new Component({
  id: "stats-sessions",
  name: "Stats Sessions",
  tags: ["dashboard"],
  description: `Component for sessions stats. SQL: SELECT COUNT(*) as pocet_turnusu FROM turnusy`,
  html: `
  <div id="sessions-stat-card">
    <div id="sessions-stat-icon">📅</div>
    <div id="sessions-stat-content">
      <div id="sessions-stat-number">pocet_turnusu</div>
      <div id="sessions-stat-label">turnusů</div>
    </div>
  </div>
`,
  css: `
#sessions-stat-card {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width:400px;
}

#sessions-stat-icon {
  font-size: 32px;
}

#sessions-stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#sessions-stat-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  sql: `SELECT COUNT(*) as pocet_turnusu FROM turnusy`
});
