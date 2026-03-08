import { Component } from "~/model/Component";

export const addSupervisorToMealMealsComponent = new Component({
    id: "add-supervisor-to-meal-meals",
    name: "Add Supervisor to Meal - Meals Select",
    tags: ["meals"],
    description: `Component for selecting meals to add supervisors to.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_jidla AS id_jidla as id, jmeno AS jmeno, doba_podavani AS doba_podavani FROM jidla ORDER BY doba_podavani, jmeno`
});
