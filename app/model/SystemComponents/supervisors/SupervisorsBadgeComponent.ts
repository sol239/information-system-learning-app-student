import { Component } from "~/model/Component";

export const supervisorsBadgeComponent = new Component({
    id: "supervisors-badge",
    name: "Supervisors Badge",
    tags: ["supervisors"],
    description: `SQL for getting all supervisors.`,
    html: `<div class="supervisors-badge">{{age}}</div>`,
    css: `.supervisors-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            border-radius: 9px;
            background-color: #f5f3ff;
            color: #7c3aed;
            border: 1px solid rgba(124, 58, 237, 0.1);
            white-space: nowrap;
        }`,
    js: "",
    sql: `
            SELECT id_vedouciho AS id_vedouciho, jmeno AS jmeno, email, rodne_cislo AS rodne_cislo, telefon AS telefon, adresa AS adresa, vek AS vek
            FROM vedouci
            ORDER BY id_vedouciho
        `
});
