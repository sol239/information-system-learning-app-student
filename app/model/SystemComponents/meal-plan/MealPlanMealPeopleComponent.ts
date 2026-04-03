import { Component } from "~/model/Component";

export const mealPlanMealPeopleComponent = new Component({
  id: "meal-plan-meal-people",
  name: "Meal Plan Meal People",
  tags: ["meal-plan"],
  description: `Participants and supervisors who had a meal on a specific day. Requires generalVariables: mealId, dayDate.`,
  html: `
<div id="mp-people-section">
  <div id="mp-ptcp-section">
    <div id="mp-ptcp-header">
      <span id="mp-ptcp-icon">🧑‍🤝‍🧑</span>
      <span id="mp-ptcp-title">Participants (mp_ptcp_count)</span>
    </div>
    <div id="mp-ptcp-list">mp_ptcp_html</div>
  </div>
  <div id="mp-sup-section">
    <div id="mp-sup-header">
      <span id="mp-sup-icon">👥</span>
      <span id="mp-sup-title">Supervisors (mp_sup_count)</span>
    </div>
    <div id="mp-sup-list">mp_sup_html</div>
  </div>
</div>
`,
  css: `
#mp-people-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

#mp-ptcp-section, #mp-sup-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#mp-ptcp-header, #mp-sup-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

#mp-ptcp-list, #mp-sup-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mp-person-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: 10px;
}

.mp-p-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background-color: #dbeafe;
  color: #1d4ed8;
  flex-shrink: 0;
}

.mp-s-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background-color: #ede9fe;
  color: #7c3aed;
  flex-shrink: 0;
}

.mp-person-name {
  font-size: 13px;
  font-weight: 600;
  color: #1d4ed8;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meal-plan-meal-people": `SELECT (SELECT COUNT(*) FROM ucastnici_jidla WHERE id_jidla = mealId AND datum_podavani = 'dayDate') AS mp_ptcp_count, (SELECT COALESCE(GROUP_CONCAT('<div class="mp-person-row"><div class="mp-p-avatar">' || SUBSTR(u.jmeno,1,1) || SUBSTR(u.jmeno,INSTR(u.jmeno,' ')+1,1) || '</div><div class="mp-person-name">' || u.jmeno || '</div></div>', ''), '') FROM ucastnici u JOIN ucastnici_jidla uj ON u.id_ucastnika = uj.id_ucastnika WHERE uj.id_jidla = mealId AND uj.datum_podavani = 'dayDate') AS mp_ptcp_html, (SELECT COUNT(*) FROM jidla_vedouci WHERE id_jidla = mealId AND datum_podavani = 'dayDate') AS mp_sup_count, (SELECT COALESCE(GROUP_CONCAT('<div class="mp-person-row"><div class="mp-s-avatar">' || SUBSTR(v.jmeno,1,1) || SUBSTR(v.jmeno,INSTR(v.jmeno,' ')+1,1) || '</div><div class="mp-person-name">' || v.jmeno || '</div></div>', ''), '') FROM vedouci v JOIN jidla_vedouci jv ON v.id_vedouciho = jv.id_vedouciho WHERE jv.id_jidla = mealId AND jv.datum_podavani = 'dayDate') AS mp_sup_html`
  },
  sql_click: {}
});

