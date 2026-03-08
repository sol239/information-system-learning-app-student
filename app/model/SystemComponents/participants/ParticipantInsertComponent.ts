import { Component } from "~/model/Component";

export const participantInsertComponent = new Component({
    id: "participant-insert",
    name: "Participant Insert",
    tags: ["participants"],
    description: `SQL for inserting a participant.`,
    html: "",
    css: "",
    js: "",
    sql: `
            INSERT INTO ucastnici (jmeno, email, rodne_cislo, telefon, adresa, vek)
            VALUES (?, ?, ?, ?, ?, ?)
        `
});
