import { Component } from "~/model/Component";

export const mealPlanSessionHeaderComponent = new Component({
  id: "meal-plan-session-header",
  name: "Meal Plan Session Header",
  tags: ["meal-plan"],
  description: `Session accordion header row for the meal plan. Requires generalVariable: sessionId.`,
  html: `
<div id="mp-sess-row">
  <div id="mp-sess-left">
    <span id="mp-sess-cal-icon">📅</span>
    <span id="mp-sess-label">Session sessionId</span>
  </div>
  <div id="mp-sess-badges">
    <span id="mp-sess-date-badge">mp_sess_from – mp_sess_to</span>
    <span id="mp-sess-meals-badge">Unique meals count mp_unique_meals</span>
    <span id="mp-sess-portions-badge">Portion Count mp_portion_count</span>
  </div>
</div>
`,
  css: `
#mp-sess-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

#mp-sess-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

#mp-sess-cal-icon {
  font-size: 20px;
}

#mp-sess-label {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

#mp-sess-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

#mp-sess-date-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #cffafe;
  color: #0e7490;
  border: 1px solid #a5f3fc;
}

#mp-sess-meals-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

#mp-sess-portions-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ede9fe;
  color: #7c3aed;
  border: 1px solid #ddd6fe;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meal-plan-session-header": `SELECT strftime('%d. %m. %Y', t.datum_od) AS mp_sess_from, strftime('%d. %m. %Y', t.datum_do) AS mp_sess_to, COUNT(DISTINCT kj.id_jidla) AS mp_unique_meals, (SELECT COUNT(*) FROM ucastnici_jidla uj WHERE DATE(uj.datum_podavani) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do)) + (SELECT COUNT(*) FROM jidla_vedouci jv WHERE DATE(jv.datum_podavani) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do)) AS mp_portion_count FROM turnusy t LEFT JOIN kniha_jidel kj ON DATE(kj.datum) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do) WHERE t.id_turnusu = sessionId GROUP BY t.id_turnusu`
  },
  sql_click: {}
});

