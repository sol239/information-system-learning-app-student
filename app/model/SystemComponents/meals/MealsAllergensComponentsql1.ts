import { Component } from "~/model/Component";

export const mealsAllergensComponentsql1 = new Component({
    id: "meals-allergens-sql-1",
    name: "Meals Allergens (sql-1)",
    tags: ["meals"],
    description: `SQL for getting meals allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT ma.id_jidla AS id_jidla, a.id_alergenu AS id_alergenu
            FROM jidla_alergeny ma
            JOIN alergeny a ON ma.id_alergenu = a.id_alergenu
            WHERE id_jidla = ?`
});
