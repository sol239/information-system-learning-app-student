import { Component } from "~/model/Component";

export const participantsAllergensComponent = new Component({
    id: "participants-allergens",
    name: "Participants Allergens",
    tags: ["participants"],
    description: `SQL for getting participants allergens.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT pa.id_ucastnika AS id_ucastnika, a.id_alergenu AS id_alergenu
            FROM ucastnici_alergeny pa
            JOIN alergeny a ON pa.id_alergenu = a.id_alergenu
        `
});
