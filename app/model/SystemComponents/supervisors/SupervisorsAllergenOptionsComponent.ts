import { Component } from "~/model/Component";

export const supervisorsAllergenOptionsComponent = new Component({
    id: "supervisors-allergen-options",
    name: "Supervisors Allergen Options",
    tags: ["supervisors"],
    description: `SQL for getting allergen options (same table).`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu, jmeno AS jmeno from alergeny`
});
