import { Component } from "~/model/Component";

export const mealPlanParticipantAllergensComponent = new Component({
    id: "meal-plan-participant-allergen-list",
    name: "Meal Plan Participant Allergen List",
    tags: ["meals"],
    description: `Component for getting meal plan allergens related to participants.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT a.jmeno AS jmeno, mp.id_ucastnika AS id_ucastnika FROM jidla_alergeny AS am JOIN jidla AS m ON am.id_jidla = m.id_jidla JOIN alergeny AS a ON a.id_alergenu = am.id_alergenu JOIN ucastnici_jidla AS mp ON mp.id_jidla = m.id_jidla WHERE am.id_jidla = ?`
});
