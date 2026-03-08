import { Component } from "~/model/Component";

export const mealCountBadgeComponentsql1 = new Component({
    id: "meals-count-badge-sql-1",
    name: "Meals Count Badge (sql-1)",
    tags: ["meals"],
    description: `Badge showing the count of meals, optionally filtered by when_served type.`,
    html: ``,
    css: ``,
    js: ``,
    sql: `SELECT COUNT(*) as count FROM jidla`
});
