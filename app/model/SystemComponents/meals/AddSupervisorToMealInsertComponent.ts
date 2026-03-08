import { Component } from "~/model/Component";

export const addSupervisorToMealInsertComponent = new Component({
    id: "add-supervisor-to-meal-insert",
    name: "Add Supervisor to Meal - Insert",
    tags: ["meals"],
    description: `Component for inserting supervisor-meal relationships.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO jidla_vedouci (id_jidla, id_vedouciho, datum_podavani) VALUES (?, ?, ?)`
});
