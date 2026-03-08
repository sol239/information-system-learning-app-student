import { Component } from "~/model/Component";

export const addParticipantToMealSelectComponent = new Component({
    id: "add-participant-to-meal-select",
    name: "Add Participant to Meal - Participant Select",
    tags: ["meals"],
    description: `Component for selecting participants to add to meals.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_ucastnika AS id_ucastnika as id, jmeno AS jmeno FROM ucastnici ORDER BY jmeno`
});
