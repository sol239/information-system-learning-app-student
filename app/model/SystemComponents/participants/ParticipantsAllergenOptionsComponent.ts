import { Component } from "~/model/Component";

export const participantsAllergenOptionsComponent = new Component({
    id: "participants-allergen-options",
    name: "Participants Allergen Options",
    tags: ["participants"],
    description: `SQL for getting allergen options.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_alergenu AS id_alergenu, jmeno AS jmeno from alergeny`
});
