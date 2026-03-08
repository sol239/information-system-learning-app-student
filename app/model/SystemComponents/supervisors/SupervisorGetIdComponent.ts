import { Component } from "~/model/Component";

export const supervisorGetIdComponent = new Component({
    id: "supervisor-get-id",
    name: "Supervisor Get ID",
    tags: ["supervisors"],
    description: `SQL for getting supervisor ID after insert.`,
    html: "",
    css: "",
    js: "",
    sql: `
            SELECT id_vedouciho AS id_vedouciho FROM vedouci
            WHERE jmeno = ? AND email = ?
            ORDER BY id_vedouciho DESC LIMIT 1
        `
});
