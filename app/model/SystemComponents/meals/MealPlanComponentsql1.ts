import { Component } from "~/model/Component";

export const mealPlanComponentsql1 = new Component({
    id: "meal-plan-list-sql-1",
    name: "Meal Plan List (sql-1)",
    tags: ["meals"],
    description: `Component for getting meal plan information.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT * FROM turnusy;`
});
