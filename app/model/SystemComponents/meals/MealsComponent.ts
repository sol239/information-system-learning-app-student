import { Component } from "~/model/Component";

export const mealsComponent = new Component({
    id: "meals",
    name: "Meals",
    tags: ["meals"],
    description: `SQL for getting meals.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT * FROM jidla`
});
