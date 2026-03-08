import { Component } from "~/model/Component";

export const supervisorAllergenDeleteComponent = new Component({
    id: "supervisor-allergen-delete",
    name: "Supervisor Allergen Delete",
    tags: ["supervisors"],
    description: `SQL for deleting supervisor-allergen association.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM vedouci_alergeny WHERE id_vedouciho = ? AND id_alergenu = ?`
});
