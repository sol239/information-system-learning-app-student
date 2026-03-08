import { Component } from "~/model/Component";

export const mealListComponent = new Component({
    id: "meal-plan-meal-allergen-list",
    name: "Meal Plan Meal List",
    tags: ["meals"],
    description: `Component for getting meal plan information.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT am.id_alergenu AS id_alergenu, a.jmeno AS jmeno, am.id_jidla AS id_jidla FROM jidla_alergeny AS am JOIN jidla AS m ON am.id_jidla = m.id_jidla JOIN alergeny AS a ON a.id_alergenu = am.id_alergenu WHERE am.id_jidla = ?`
});
