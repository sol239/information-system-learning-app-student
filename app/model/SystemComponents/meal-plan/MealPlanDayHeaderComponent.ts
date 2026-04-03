import { Component } from "~/model/Component";

export const mealPlanDayHeaderComponent = new Component({
  id: "meal-plan-day-header",
  name: "Meal Plan Day Header",
  tags: ["meal-plan"],
  description: `Day accordion header row for the meal plan. Requires generalVariable: dayDate (YYYY-MM-DD string).`,
  html: `
<div id="mp-day-row">
  <div id="mp-day-left">
    <span id="mp-day-cal-icon">📅</span>
    <span id="mp-day-date">mp_day_display</span>
  </div>
  <div id="mp-day-badges">
    <span id="mp-day-meals-badge">Unique meals count mp_day_unique_meals</span>
    <span id="mp-day-portions-badge">Portion Count mp_day_portions</span>
  </div>
</div>
`,
  css: `
#mp-day-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

#mp-day-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

#mp-day-cal-icon {
  font-size: 16px;
}

#mp-day-date {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

#mp-day-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

#mp-day-meals-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

#mp-day-portions-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
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
    "meal-plan-day-header": `SELECT strftime('%d. %m. %Y', 'dayDate') AS mp_day_display, COUNT(DISTINCT id_jidla) AS mp_day_unique_meals, (SELECT COUNT(*) FROM ucastnici_jidla WHERE datum_podavani = 'dayDate') + (SELECT COUNT(*) FROM jidla_vedouci WHERE datum_podavani = 'dayDate') AS mp_day_portions FROM kniha_jidel WHERE datum = 'dayDate'`
  },
  sql_click: {}
});

