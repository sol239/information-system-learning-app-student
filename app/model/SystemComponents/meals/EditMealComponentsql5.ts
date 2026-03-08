import { Component } from "~/model/Component";

export const editMealComponentsql5 = new Component({
    id: "meals-edit-sql-5",
    name: "Edit Meal (sql-5)",
    tags: ["meals"],
    description: `Component for editing a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO jidla_alergeny (id_jidla, id_alergenu) VALUES (?, ?)`
});
