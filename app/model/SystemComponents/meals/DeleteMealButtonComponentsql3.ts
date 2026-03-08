import { Component } from "~/model/Component";

export const deleteMealButtonComponentsql3 = new Component({
    id: "meals-delete-sql-3",
    name: "Delete Meal Button (sql-3)",
    tags: ["meals"],
    description: `Button for deleting a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM ucastnici_jidla WHERE id_jidla = ?`
});
