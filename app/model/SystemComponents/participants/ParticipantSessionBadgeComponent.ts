import { Component } from "~/model/Component";

export const participantSessionBadgeComponent = new Component({
  id: "participant-session-badge",
  name: "Participant Session Badge",
  tags: ["participants"],
  description: `Shows the session name and date range for a participant. Requires generalVariable: participantId.`,
  html: `
<div id="ptcp-sess-badge">
  Session ptcp_sess_id (ptcp_sess_from – ptcp_sess_to)
</div>
`,
  css: `
#ptcp-sess-badge {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
  padding: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "participant-session-badge": `SELECT t.id_turnusu AS ptcp_sess_id, strftime('%d. %-m.', t.datum_od) AS ptcp_sess_from, strftime('%d. %-m. %Y', t.datum_do) AS ptcp_sess_to FROM turnusy t JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu WHERE tu.id_ucastnika = participantId LIMIT 1`
  },
  sql_click: {}
});

