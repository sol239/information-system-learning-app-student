import { Component } from "~/model/Component";

export const addSupervisorToMealSelectComponent = new Component({
    id: "add-supervisor-to-meal-select",
    name: "Add Supervisor to Meal - Supervisor Select",
    tags: ["meals"],
    description: `Component for selecting supervisors to add to meals.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_vedouciho AS id_vedouciho as id, jmeno AS jmeno FROM vedouci ORDER BY jmeno`
});
