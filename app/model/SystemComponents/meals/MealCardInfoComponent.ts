import { Component } from "~/model/Component";

export const mealCardInfoComponent = new Component({
  id: "meal-card-info",
  name: "Meal Card Info",
  tags: ["meals"],
  description: `Card showing meal name and a serving-time badge. Requires generalVariable: mealId.`,
  html: `
<div id="meal-card-header">
  <span id="meal-name">jmeno</span>
  <span id="meal-time-badge">doba_podavani</span>
</div>
`,
  css: `
#meal-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

#meal-name {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

#meal-time-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #d1fae5;
  color: #065f46;
  white-space: nowrap;
  flex-shrink: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meal-card-info": `SELECT jmeno, doba_podavani FROM jidla WHERE id_jidla = mealId`
  },
  sql_click: {}
});

