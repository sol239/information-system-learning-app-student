import { Component } from "~/model/Component";

export const deleteMealButtonComponentsql1 = new Component({
    id: "meals-delete-sql-1",
    name: "Delete Meal Button (sql-1)",
    tags: ["meals"],
    description: `Button for deleting a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM jidla WHERE id_jidla = ?`
});
