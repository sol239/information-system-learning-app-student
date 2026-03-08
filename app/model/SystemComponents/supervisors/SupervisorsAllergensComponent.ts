import { Component } from "~/model/Component";

export const supervisorsAllergensComponent = new Component({
    id: "supervisors-allergens",
    name: "Supervisors Allergens",
    tags: ["supervisors"],
    description: `SQL for getting supervisors allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT sa.id_vedouciho AS id_vedouciho, a.id_alergenu AS id_alergenu
            FROM vedouci_alergeny sa
            JOIN alergeny a ON sa.id_alergenu = a.id_alergenu
        `
});
