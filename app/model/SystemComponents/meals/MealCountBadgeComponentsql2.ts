import { Component } from "~/model/Component";

export const mealCountBadgeComponentsql2 = new Component({
    id: "meals-count-badge-sql-2",
    name: "Meals Count Badge (sql-2)",
    tags: ["meals"],
    description: `Badge showing the count of meals, optionally filtered by when_served type.`,
    html: ``,
    css: ``,
    js: ``,
    sql: `SELECT COUNT(*) as count FROM jidla WHERE doba_podavani = ?`
});
