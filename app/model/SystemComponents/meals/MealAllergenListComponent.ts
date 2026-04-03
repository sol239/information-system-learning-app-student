import { Component } from "~/model/Component";

export const mealAllergenListComponent = new Component({
  id: "meal-allergen-list",
  name: "Meal Allergen List",
  tags: ["meals"],
  description: `Shows allergen pills for a meal. Requires generalVariable: mealId.`,
  html: `
<div id="meal-allerg-section">
  <div id="meal-allerg-label">Allergens:</div>
  <div id="meal-allerg-pills">meal_allerg_html</div>
</div>
`,
  css: `
#meal-allerg-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

#meal-allerg-label {
  font-size: 13px;
  color: #6b7280;
}

#meal-allerg-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.meal-allerg-pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #fce7f3;
  border: 1px solid #fbcfe8;
  color: #be185d;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meal-allergen-list": `SELECT COALESCE(GROUP_CONCAT('<span class="meal-allerg-pill">' || a.jmeno || '</span>', ''), '') AS meal_allerg_html FROM jidla j LEFT JOIN jidla_alergeny ja ON j.id_jidla = ja.id_jidla LEFT JOIN alergeny a ON ja.id_alergenu = a.id_alergenu WHERE j.id_jidla = mealId`
  },
  sql_click: {}
});

