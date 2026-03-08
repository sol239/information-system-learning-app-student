import { Component } from "~/model/Component";

export const supervisorAllergenIdsComponent = new Component({
    id: "supervisor-allergen-ids",
    name: "Supervisor Allergen IDs",
    tags: ["supervisors"],
    description: `SQL for getting supervisor allergen IDs.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu FROM vedouci_alergeny WHERE id_vedouciho = ?`
});
