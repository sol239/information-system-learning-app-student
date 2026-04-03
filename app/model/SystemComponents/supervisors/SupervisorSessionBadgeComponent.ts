import { Component } from "~/model/Component";

export const supervisorSessionBadgeComponent = new Component({
  id: "supervisor-session-badge",
  name: "Supervisor Session Badge",
  tags: ["supervisors"],
  description: `Shows the session name and date range for a supervisor. Requires generalVariable: supervisorId.`,
  html: `
<div id="sup-sess-badge">
  Session sup_sess_id (sup_sess_from – sup_sess_to)
</div>
`,
  css: `
#sup-sess-badge {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "supervisor-session-badge": `SELECT t.id_turnusu AS sup_sess_id, strftime('%d. %-m.', t.datum_od) AS sup_sess_from, strftime('%d. %-m. %Y', t.datum_do) AS sup_sess_to FROM turnusy t JOIN vedouci_turnusy vt ON t.id_turnusu = vt.id_turnusu WHERE vt.id_vedouciho = supervisorId LIMIT 1`
  },
  sql_click: {}
});

