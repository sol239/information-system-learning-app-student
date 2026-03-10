import { Component } from "~/model/Component";

export const statsParticipantsComponent = new Component({
  id: "stats-participants",
  name: "Stats Participants",
  tags: ["dashboard"],
  description: `Component for participants stats. SQL: SELECT COUNT(*) as pocet_ucastniku FROM ucastnici`,
  html: `
  <div id="participants-stat-card">
    <div id="participants-stat-icon">👥</div>
    <div id="participants-stat-content">
      <div id="participants-stat-number">pocet_ucastniku</div>
      <div id="participants-stat-label">účastníků</div>
    </div>
  </div>
`,
  css: `
#participants-stat-card {
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

#participants-stat-icon {
  font-size: 32px;
}

#participants-stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#participants-stat-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stats-participants": `SELECT COUNT(*) as pocet_ucastniku FROM ucastnici`
  },
  sql_click: {}
});
