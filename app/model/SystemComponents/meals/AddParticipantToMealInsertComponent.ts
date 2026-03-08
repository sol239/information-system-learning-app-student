import { Component } from "~/model/Component";

export const addParticipantToMealInsertComponent = new Component({
    id: "add-participant-to-meal-insert",
    name: "Add Participant to Meal - Insert",
    tags: ["meals"],
    description: `Component for inserting participant-meal relationships.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO ucastnici_jidla (id_jidla, id_ucastnika, datum_podavani) VALUES (?, ?, ?)`
});
