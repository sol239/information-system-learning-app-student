import { Component } from "~/model/Component";

export const mealPlanComponentsql4 = new Component({
    id: "meal-plan-list-sql-4",
    name: "Meal Plan List (sql-4)",
    tags: ["meals"],
    description: `Component for getting meal plan information.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu, jmeno AS jmeno FROM jidla_alergeny JOIN jidla ON jidla_alergeny.id_jidla = jidla.id_jidla WHERE jidla_alergeny.id_jidla = ?`
});
