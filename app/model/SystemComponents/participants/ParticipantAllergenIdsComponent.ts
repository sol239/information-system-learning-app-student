import { Component } from "~/model/Component";

export const participantAllergenIdsComponent = new Component({
    id: "participant-allergen-ids",
    name: "Participant Allergen IDs",
    tags: ["participants"],
    description: `SQL for getting participant allergen IDs.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu FROM ucastnici_alergeny WHERE id_ucastnika = ?`
});
