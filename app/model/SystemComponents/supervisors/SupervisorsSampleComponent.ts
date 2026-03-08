import { Component } from "~/model/Component";

export const supervisorsSampleComponent = new Component({
    id: "supervisors-sample",
    name: "Supervisors Sample",
    tags: ["supervisors"],
    description: `SQL for getting supervisors sample.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT id_vedouciho AS id_vedouciho, jmeno AS jmeno, email FROM vedouci ORDER BY id_vedouciho DESC LIMIT 3`
});
