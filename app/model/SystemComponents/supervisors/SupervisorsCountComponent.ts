import { Component } from "~/model/Component";

export const supervisorsCountComponent = new Component({
    id: "supervisors-count",
    name: "Supervisors Count",
    tags: ["supervisors"],
    description: `SQL for counting supervisors.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT COUNT(*) as count FROM vedouci`
});
