import { Component } from "~/model/Component";

export const mealsTotalCountBarComponent = new Component({
  id: "meals-total-count-bar",
  name: "Meals Total Count Bar",
  tags: ["meals"],
  description: `Shows total meal count in a toolbar widget.`,
  html: `
<div id="meals-count-widget">
  <span id="meals-count-icon">🍴</span>
  <span id="meals-count-label">Meal Count: meals_total_count</span>
</div>
`,
  css: `
#meals-count-widget {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #15803d;
  font-size: 13px;
  font-weight: 600;
}

#meals-count-icon {
  font-size: 15px;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "meals-total-count-bar": `SELECT COUNT(*) AS meals_total_count FROM jidla`
  },
  sql_click: {}
});
