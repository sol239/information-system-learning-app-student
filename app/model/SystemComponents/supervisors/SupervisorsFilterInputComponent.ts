import { Component } from "~/model/Component";

export const supervisorsFilterInputComponent = new Component({
    id: "supervisors-filter-input",
    name: "Supervisors Filter Input",
    tags: ["supervisors"],
    description: `Component for filter input (supervisors).`,
    html: "",
    css: "",
    js: `(p.name && p.name.toLowerCase().includes(text)) ||
               (p.email && p.email.toLowerCase().includes(text)) ||
               (p.phone && p.phone.toLowerCase().includes(text)) ||
               (p.address && p.address.toLowerCase().includes(text))`,
    sql: ""
});
