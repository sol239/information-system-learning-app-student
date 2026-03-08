import { Component } from "~/model/Component";

export const statsSupervisorsComponent = new Component({
  id: "stats-supervisors",
  name: "Stats Supervisors",
  tags: ["dashboard"],
  description: `Component for supervisors stats. SQL: SELECT COUNT(*) as pocet_vedoucich FROM vedouci`,
  html: `
  <div id="supervisors-stat-card">
    <div id="supervisors-stat-icon">👨‍🏫</div>
    <div id="supervisors-stat-content">
      <div id="supervisors-stat-number">pocet_vedoucich</div>
      <div id="supervisors-stat-label">vedoucích</div>
    </div>
  </div>
`,
  css: `
#supervisors-stat-card {
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

#supervisors-stat-icon {
  font-size: 32px;
}

#supervisors-stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#supervisors-stat-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  sql: `SELECT COUNT(*) as pocet_vedoucich FROM vedouci`
});
