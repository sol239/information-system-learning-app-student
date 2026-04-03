import { Component } from "~/model/Component";

export const participantAllergenBadgeComponent = new Component({
  id: "participant-allergen-badge",
  name: "Participant Allergen Badge",
  tags: ["participants"],
  description: `Shows allergen count badge (green=0, pink>=1) for a participant. Requires generalVariable: participantId.`,
  html: `
<div id="ptcp-allergen-badge-wrapper">ptcp_allergen_html</div>
`,
  css: `
#ptcp-allergen-badge-wrapper {
  display: inline-flex;
}

.ptcp-allerg-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
}

.ptcp-allerg-none {
  background-color: #dcfce7;
  border-color: #bbf7d0;
  color: #15803d;
}

.ptcp-allerg-has {
  background-color: #fce7f3;
  border-color: #fbcfe8;
  color: #be185d;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "participant-allergen-badge": `SELECT '<span class="ptcp-allerg-badge ' || CASE WHEN COUNT(ua.id_alergenu) = 0 THEN 'ptcp-allerg-none' ELSE 'ptcp-allerg-has' END || '">Allergens: ' || COUNT(ua.id_alergenu) || '</span>' AS ptcp_allergen_html FROM ucastnici u LEFT JOIN ucastnici_alergeny ua ON u.id_ucastnika = ua.id_ucastnika WHERE u.id_ucastnika = participantId`
  },
  sql_click: {}
});

