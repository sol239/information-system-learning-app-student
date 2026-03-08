import { Component } from "~/model/Component";

export const mealParticipantDeleteComponent = new Component({
    id: "meal-participant-delete",
    name: "Meal Participant Delete",
    tags: ["meals"],
    description: `Component for deleting a participant from a meal.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM ucastnici_jidla WHERE id_jidla = ? AND id_ucastnika = ?`
});
