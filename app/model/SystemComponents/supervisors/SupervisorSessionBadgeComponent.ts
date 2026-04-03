import { Component } from "~/model/Component";

export const stitekTurnusuVedoucihoKomponenta = new Component({
  id: "stitek-turnusu-vedouciho",
  name: "Štítek turnusu vedoucího",
  tags: ["vedoucí"],
  description: `Zobrazuje název turnusu a datum pro vedoucího. Vyžaduje generalVariable: idVedouciho.`,
  html: `
<div id="stitek-turnusu-vedouciho">
  Turnus id_turnusu_vedouciho (datum_od_vedouciho – datum_do_vedouciho)
</div>
`,
  css: `
#stitek-turnusu-vedouciho {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stitek-turnusu-vedouciho": `SELECT t.id_turnusu AS id_turnusu_vedouciho, strftime('%d. %m.', t.datum_od) AS datum_od_vedouciho, strftime('%d. %m. %Y', t.datum_do) AS datum_do_vedouciho FROM turnusy t JOIN vedouci_turnusy vt ON t.id_turnusu = vt.id_turnusu WHERE vt.id_vedouciho = idVedouciho LIMIT 1`
  },
  sql_click: {}
});

