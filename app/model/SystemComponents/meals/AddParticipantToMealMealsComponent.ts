import { Component } from "~/model/Component";

export const addParticipantToMealMealsComponent = new Component({
    id: "add-participant-to-meal-meals",
    name: "Add Participant to Meal - Meals Select",
    tags: ["meals"],
    description: `Component for selecting meals to add participants to.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_jidla AS id_jidla as id, jmeno AS jmeno, doba_podavani AS doba_podavani FROM jidla ORDER BY doba_podavani, jmeno`
});
