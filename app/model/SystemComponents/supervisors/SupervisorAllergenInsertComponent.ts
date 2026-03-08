import { Component } from "~/model/Component";

export const supervisorAllergenInsertComponent = new Component({
    id: "supervisor-allergen-insert",
    name: "Supervisor Allergen Insert",
    tags: ["supervisors"],
    description: `SQL for inserting supervisor-allergen association.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO vedouci_alergeny (id_vedouciho, id_alergenu) VALUES (?, ?)`
});
