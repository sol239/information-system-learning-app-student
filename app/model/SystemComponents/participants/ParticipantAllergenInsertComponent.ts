import { Component } from "~/model/Component";

export const participantAllergenInsertComponent = new Component({
    id: "participant-allergen-insert",
    name: "Participant Allergen Insert",
    tags: ["participants"],
    description: `SQL for inserting participant-allergen association.`,
    html: "",
    css: "",
    js: "",
    sql: `INSERT INTO ucastnici_alergeny (id_ucastnika, id_alergenu) VALUES (?, ?)`
});
