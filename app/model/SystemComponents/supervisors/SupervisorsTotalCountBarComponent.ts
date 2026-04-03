import { Component } from "~/model/Component";

export const supervisorsTotalCountBarComponent = new Component({
  id: "supervisors-total-count-bar",
  name: "Supervisors Total Count Bar",
  tags: ["supervisors"],
  description: `Shows total supervisors count across all sessions in a toolbar widget.`,
  html: `
<div id="sup-count-widget">
  <span id="sup-count-icon">👨‍🏫</span>
  <span id="sup-count-label">Supervisors: sup_total_count</span>
</div>
`,
  css: `
#sup-count-widget {
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

#sup-count-icon {
  font-size: 15px;
}

#sup-count-label {
  color: #a78bfa;
  font-weight: 700;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "supervisors-total-count-bar": `SELECT COUNT(*) AS sup_total_count FROM vedouci`
  },
  sql_click: {}
});
