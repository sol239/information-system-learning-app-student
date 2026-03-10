import { Component } from "~/model/Component";

export const statsMealsComponent = new Component({
  id: "stats-meals",
  name: "Stats Meals",
  tags: ["dashboard"],
  description: `Component for meals stats. SQL: SELECT COUNT(*) as count FROM jidla`,
  html: `
  <div id="meals-stat-card">
  <div id="meals-stat-icon">🍽️</div>
  <div id="meals-stat-content">
    <div id="meals-stat-number">pocet_jidel</div>
    <div id="meals-stat-label">jídel</div>
  </div>
</div>
`,
  css: `
#meals-stat-card {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width:400px;
}

#meals-stat-icon {
  font-size: 32px;
}

#meals-stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#meals-stat-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stats-meals": `SELECT COUNT(*) as pocet_jidel FROM jidla`
  },
  sql_click: {}
});
