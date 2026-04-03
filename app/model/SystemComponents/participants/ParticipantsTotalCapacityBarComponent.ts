import { Component } from "~/model/Component";

export const participantsTotalCapacityBarComponent = new Component({
  id: "participants-total-capacity-bar",
  name: "Participants Total Capacity Bar",
  tags: ["participants"],
  description: `Shows total enrolled / total capacity and percentage across all sessions.`,
  html: `
<div id="ptcp-cap-bar-widget">
  <span id="ptcp-cap-bar-people-icon">👥</span>
  <span id="ptcp-cap-bar-label">Capacity: ptcp_total_enrolled/ptcp_total_capacity</span>
  <div id="ptcp-cap-bar-bg">
    <div id="ptcp-cap-bar-fill" style="width: ptcp_total_pct%"></div>
  </div>
  <span id="ptcp-cap-bar-pct">ptcp_total_pct%</span>
</div>
`,
  css: `
#ptcp-cap-bar-widget {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 10px;
  color: #e4e4e7;
  font-size: 13px;
  font-weight: 500;
}

#ptcp-cap-bar-people-icon {
  font-size: 15px;
}

#ptcp-cap-bar-bg {
  width: 80px;
  height: 8px;
  background: #3f3f46;
  border-radius: 9999px;
  overflow: hidden;
}

#ptcp-cap-bar-fill {
  height: 100%;
  background: #22c55e;
  border-radius: 9999px;
}

#ptcp-cap-bar-pct {
  color: #22c55e;
  font-weight: 700;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "participants-total-capacity-bar": `SELECT COUNT(DISTINCT tu.id_ucastnika) AS ptcp_total_enrolled, SUM(DISTINCT t.kapacita) AS ptcp_total_capacity, (COUNT(DISTINCT tu.id_ucastnika) * 100) / SUM(DISTINCT t.kapacita) AS ptcp_total_pct FROM turnusy t LEFT JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu`
  },
  sql_click: {}
});
