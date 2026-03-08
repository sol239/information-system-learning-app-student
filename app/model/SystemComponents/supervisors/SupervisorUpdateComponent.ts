import { Component } from "~/model/Component";

export const supervisorUpdateComponent = new Component({
    id: "supervisor-update",
    name: "Supervisor Update",
    tags: ["supervisors"],
    description: `SQL for updating a supervisor.`,
    html: "",
    css: "",
    js: "",
    sql: `
            UPDATE vedouci
            SET jmeno = ?, email = ?, rodne_cislo = ?, telefon = ?, adresa = ?, vek = ?
            WHERE id_vedouciho = ?
        `
});
