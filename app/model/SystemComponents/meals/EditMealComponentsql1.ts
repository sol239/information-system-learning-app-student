import { Component } from "~/model/Component";

export const editMealComponentsql1 = new Component({
    id: "meals-edit-sql-1",
    name: "Edit Meal (sql-1)",
    tags: ["meals"],
    description: `Component for editing a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `UPDATE jidla SET jmeno = ?, doba_podavani = ? WHERE id_jidla = ?`
});
