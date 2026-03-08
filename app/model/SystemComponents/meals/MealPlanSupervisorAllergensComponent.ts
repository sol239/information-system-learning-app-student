import { Component } from "~/model/Component";

export const mealPlanSupervisorAllergensComponent = new Component({
    id: "meal-plan-supervisor-allergen-list",
    name: "Meal Plan Supervisor Allergen List",
    tags: ["meals"],
    description: `Component for getting meal plan allergens related to supervisors.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT a.jmeno AS jmeno, ms.id_vedouciho AS id_vedouciho FROM jidla_alergeny AS am JOIN jidla AS m ON am.id_jidla = m.id_jidla JOIN alergeny AS a ON a.id_alergenu = am.id_alergenu JOIN jidla_vedouci AS ms ON ms.id_jidla = m.id_jidla WHERE am.id_jidla = ?`
});
