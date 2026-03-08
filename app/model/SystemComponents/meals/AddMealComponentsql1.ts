import { Component } from "~/model/Component";

export const addMealComponentsql1 = new Component({
    id: "meals-add-sql-1",
    name: "Add Meal (sql-1)",
    tags: ["meals"],
    description: `Component for adding a new meal.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO jidla (jmeno, doba_podavani) VALUES (?, ?)`
});
