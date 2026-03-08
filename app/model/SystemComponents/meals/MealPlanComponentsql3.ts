import { Component } from "~/model/Component";

export const mealPlanComponentsql3 = new Component({
    id: "meal-plan-list-sql-3",
    name: "Meal Plan List (sql-3)",
    tags: ["meals"],
    description: `Component for getting meal plan information.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT DISTINCT m.jmeno AS jmeno AS meal_name,  m.id_jidla AS id_jidla, mp.datum_podavani AS datum_podavani, m.doba_podavani AS doba_podavani, s.jmeno AS jmeno AS supervisor_name, s.id_vedouciho AS id_vedouciho ,s.email AS supervisor_email, sp.id_turnusu AS id_turnusu FROM jidla m JOIN jidla_vedouci mp ON m.id_jidla = mp.id_jidla JOIN vedouci s ON s.id_vedouciho = mp.id_vedouciho JOIN vedouci_turnusy sp ON sp.id_vedouciho = s.id_vedouciho`
});
