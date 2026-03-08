import { Component } from "~/model/Component";

export const deleteMealButtonComponentsql2 = new Component({
    id: "meals-delete-sql-2",
    name: "Delete Meal Button (sql-2)",
    tags: ["meals"],
    description: `Button for deleting a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM jidla_alergeny WHERE id_jidla = ?`
});
