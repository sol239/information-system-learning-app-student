import { Component } from "~/model/Component";

export const participantAllergenCountComponent = new Component({
    id: "participant-allergen-count",
    name: "Participant Allergen Count",
    tags: ["participants"],
    description: `SQL for counting participant allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT COUNT(*) as count FROM ucastnici_alergeny WHERE id_ucastnika = ?`
});
