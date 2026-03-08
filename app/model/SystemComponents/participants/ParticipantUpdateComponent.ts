import { Component } from "~/model/Component";

export const participantUpdateComponent = new Component({
    id: "participant-update",
    name: "Participant Update",
    tags: ["participants"],
    description: `SQL for updating a participant.`,
    html: "",
    css: "",
    js: "",
    sql: `
            UPDATE ucastnici
            SET jmeno = ?, email = ?, rodne_cislo = ?, telefon = ?, adresa = ?, vek = ?
            WHERE id_ucastnika = ?
        `
});
