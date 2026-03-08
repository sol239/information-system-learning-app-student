import { Component } from "~/model/Component";

export const participantAllergenDeleteComponent = new Component({
    id: "participant-allergen-delete",
    name: "Participant Allergen Delete",
    tags: ["participants"],
    description: `SQL for deleting participant-allergen association.`,
    html: "",
    css: "",
    js: "",
    sql: `DELETE FROM ucastnici_alergeny WHERE id_ucastnika = ? AND id_alergenu = ?`
});
