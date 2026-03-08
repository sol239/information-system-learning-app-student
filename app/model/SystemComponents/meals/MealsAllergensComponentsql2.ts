import { Component } from "~/model/Component";

export const mealsAllergensComponentsql2 = new Component({
    id: "meals-allergens-sql-2",
    name: "Meals Allergens (sql-2)",
    tags: ["meals"],
    description: `SQL for getting meals allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT jmeno AS jmeno from alergeny WHERE id_alergenu = ?`
});
