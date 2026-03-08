import { Component } from "~/model/Component";

export const supervisorAllergenCountComponent = new Component({
    id: "supervisor-allergen-count",
    name: "Supervisor Allergen Count",
    tags: ["supervisors"],
    description: `SQL for counting supervisor allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT COUNT(*) as count FROM vedouci_alergeny WHERE id_vedouciho = ?`
});
