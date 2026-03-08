import { Component } from "~/model/Component";

export const mealSupervisorDeleteComponent = new Component({
    id: "meal-supervisor-delete",
    name: "Meal Supervisor Delete",
    tags: ["meals"],
    description: `Component for deleting a supervisor from a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM jidla_vedouci WHERE id_jidla = ? AND id_vedouciho = ?`
});
