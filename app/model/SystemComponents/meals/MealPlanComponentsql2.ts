import { Component } from "~/model/Component";

export const mealPlanComponentsql2 = new Component({
    id: "meal-plan-list-sql-2",
    name: "Meal Plan List (sql-2)",
    tags: ["meals"],
    description: `Component for getting meal plan information.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT DISTINCT m.jmeno AS jmeno AS meal_name, m.id_jidla AS id_jidla, mp.datum_podavani AS datum_podavani, m.doba_podavani AS doba_podavani, p.jmeno AS jmeno AS participant_name, p.id_ucastnika AS id_ucastnika, p.email AS participant_email, sp.id_turnusu AS id_turnusu FROM jidla m JOIN ucastnici_jidla mp ON m.id_jidla = mp.id_jidla JOIN ucastnici p ON p.id_ucastnika = mp.id_ucastnika JOIN turnusy_ucastnici sp ON sp.id_ucastnika = p.id_ucastnika`
});
