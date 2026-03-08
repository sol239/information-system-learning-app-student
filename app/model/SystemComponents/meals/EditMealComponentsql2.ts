import { Component } from "~/model/Component";

export const editMealComponentsql2 = new Component({
    id: "meals-edit-sql-2",
    name: "Edit Meal (sql-2)",
    tags: ["meals"],
    description: `Component for editing a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu FROM jidla_alergeny WHERE id_jidla = ?`
});
