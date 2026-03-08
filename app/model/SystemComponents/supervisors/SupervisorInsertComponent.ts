import { Component } from "~/model/Component";

export const supervisorInsertComponent = new Component({
    id: "supervisor-insert",
    name: "Supervisor Insert",
    tags: ["supervisors"],
    description: `SQL for inserting a supervisor.`,
    html: "",
    css: "",
    js: "",
    sql: `
            INSERT INTO vedouci (jmeno, email, rodne_cislo, telefon, adresa, vek)
            VALUES (?, ?, ?, ?, ?, ?)
        `
});
