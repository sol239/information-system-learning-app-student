import { Component } from "~/model/Component";

export const editMealComponentsql4 = new Component({
    id: "meals-edit-sql-4",
    name: "Edit Meal (sql-4)",
    tags: ["meals"],
    description: `Component for editing a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM jidla_alergeny WHERE id_jidla = ?`
});
