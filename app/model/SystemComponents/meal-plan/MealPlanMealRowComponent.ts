import { Component } from "~/model/Component";

export const mealPlanMealRowComponent = new Component({
  id: "meal-plan-meal-row",
  name: "Meal Plan Meal Row",
  tags: ["meal-plan"],
  description: `Meal row for the meal plan accordion showing name, allergens and serving time. Requires generalVariable: mealId.`,
  html: `
<div id="mp-meal-row">
  <div id="mp-meal-left">
    <span id="mp-meal-icon">🍽️</span>
    <div id="mp-meal-info">
      <span id="mp-meal-name">mp_meal_name</span>
      <div id="mp-meal-allergens">mp_allergen_html</div>
    </div>
  </div>
  <span id="mp-meal-time-badge">mp_meal_time</span>
</div>
`,
  css: `
#mp-meal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

#mp-meal-left {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

#mp-meal-icon {
  font-size: 20px;
  padding-top: 2px;
  flex-shrink: 0;
}

#mp-meal-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#mp-meal-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

#mp-meal-allergens {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.mp-allerg-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  background-color: #fce7f3;
  border: 1px solid #fbcfe8;
  color: #be185d;
}

#mp-meal-time-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  background-color: #eab308;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meal-plan-meal-row": `SELECT j.jmeno AS mp_meal_name, j.doba_podavani AS mp_meal_time, COALESCE(GROUP_CONCAT('<span class="mp-allerg-pill">' || a.jmeno || '</span>', ''), '') AS mp_allergen_html FROM jidla j LEFT JOIN jidla_alergeny ja ON j.id_jidla = ja.id_jidla LEFT JOIN alergeny a ON ja.id_alergenu = a.id_alergenu WHERE j.id_jidla = mealId GROUP BY j.id_jidla, j.jmeno, j.doba_podavani`
  },
  sql_click: {}
});

