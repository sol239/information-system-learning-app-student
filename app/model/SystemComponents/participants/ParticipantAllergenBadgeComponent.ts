import { Component } from "~/model/Component";

export const stitekAlergenuUcastnikaKomponenta = new Component({
  id: "stitek-alergenu-ucastnika",
  name: "Štítek alergenů účastníka",
  tags: ["účastníci"],
  description: `Zobrazuje štítek s počtem alergenů účastníka (zelený=0, růžový>=1). Vyžaduje generalVariable: idUcastnika.`,
  html: `
<div id="obal-stitku-alergenu-ucastnika">html_alergenu_ucastnika</div>
`,
  css: `
#obal-stitku-alergenu-ucastnika {
  display: inline-flex;
}

.stitek-alergenu-ucastnika {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
}

.stitek-alergenu-zadne {
  background-color: #dcfce7;
  border-color: #bbf7d0;
  color: #15803d;
}

.stitek-alergenu-ma {
  background-color: #fce7f3;
  border-color: #fbcfe8;
  color: #be185d;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stitek-alergenu-ucastnika": `SELECT '<span class="stitek-alergenu-ucastnika ' || CASE WHEN COUNT(ua.id_alergenu) = 0 THEN 'stitek-alergenu-zadne' ELSE 'stitek-alergenu-ma' END || '">Alergeny: ' || COUNT(ua.id_alergenu) || '</span>' AS html_alergenu_ucastnika FROM ucastnici u LEFT JOIN ucastnici_alergeny ua ON u.id_ucastnika = ua.id_ucastnika WHERE u.id_ucastnika = idUcastnika`
  },
  sql_click: {}
});

