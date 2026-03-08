import { Component } from "~/model/Component";

export const addMealComponentsql2 = new Component({
    id: "meals-add-sql-2",
    name: "Add Meal (sql-2)",
    tags: ["meals"],
    description: `Component for adding a new meal.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO jidla_alergeny (id_jidla, id_alergenu) VALUES (?, ?)`
});
