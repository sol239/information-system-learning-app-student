import { Component } from "~/model/Component";

export const deleteMealButtonComponentsql4 = new Component({
    id: "meals-delete-sql-4",
    name: "Delete Meal Button (sql-4)",
    tags: ["meals"],
    description: `Button for deleting a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM jidla_vedouci WHERE id_jidla = ?`
});
