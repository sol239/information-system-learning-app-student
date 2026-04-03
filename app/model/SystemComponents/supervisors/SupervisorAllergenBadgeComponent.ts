import { Component } from "~/model/Component";

export const supervisorAllergenBadgeComponent = new Component({
  id: "supervisor-allergen-badge",
  name: "Supervisor Allergen Badge",
  tags: ["supervisors"],
  description: `Shows allergen count badge (green=0, pink>=1) for a supervisor. Requires generalVariable: supervisorId.`,
  html: `
<div id="sup-allergen-badge-wrapper">sup_allergen_html</div>
`,
  css: `
#sup-allergen-badge-wrapper {
  display: inline-flex;
}

.sup-allerg-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
}

.sup-allerg-none {
  background-color: #dcfce7;
  border-color: #bbf7d0;
  color: #15803d;
}

.sup-allerg-has {
  background-color: #fce7f3;
  border-color: #fbcfe8;
  color: #be185d;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "supervisor-allergen-badge": `SELECT '<span class="sup-allerg-badge ' || CASE WHEN COUNT(va.id_alergenu) = 0 THEN 'sup-allerg-none' ELSE 'sup-allerg-has' END || '">Allergens: ' || COUNT(va.id_alergenu) || '</span>' AS sup_allergen_html FROM vedouci v LEFT JOIN vedouci_alergeny va ON v.id_vedouciho = va.id_vedouciho WHERE v.id_vedouciho = supervisorId`
  },
  sql_click: {}
});

