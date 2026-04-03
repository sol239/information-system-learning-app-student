import { Component } from "~/model/Component";

export const stitekAlergenuVedoucihoKomponenta = new Component({
  id: "stitek-alergenu-vedouciho",
  name: "Štítek alergenů vedoucího",
  tags: ["vedoucí"],
  description: `Zobrazuje štítek s počtem alergenů vedoucího (zelený=0, růžový>=1). Vyžaduje generalVariable: idVedouciho.`,
  html: `
<div id="obal-stitku-alergenu-vedouciho">html_alergenu_vedouciho</div>
`,
  css: `
#obal-stitku-alergenu-vedouciho {
  display: inline-flex;
}

.stitek-alergenu-vedouciho {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
}

.stitek-alergenu-vedouciho-zadne {
  background-color: #dcfce7;
  border-color: #bbf7d0;
  color: #15803d;
}

.stitek-alergenu-vedouciho-ma {
  background-color: #fce7f3;
  border-color: #fbcfe8;
  color: #be185d;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stitek-alergenu-vedouciho": `SELECT '<span class="stitek-alergenu-vedouciho ' || CASE WHEN COUNT(va.id_alergenu) = 0 THEN 'stitek-alergenu-vedouciho-zadne' ELSE 'stitek-alergenu-vedouciho-ma' END || '">Alergeny: ' || COUNT(va.id_alergenu) || '</span>' AS html_alergenu_vedouciho FROM vedouci v LEFT JOIN vedouci_alergeny va ON v.id_vedouciho = va.id_vedouciho WHERE v.id_vedouciho = idVedouciho`
  },
  sql_click: {}
});

