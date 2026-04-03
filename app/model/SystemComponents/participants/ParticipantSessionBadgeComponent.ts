import { Component } from "~/model/Component";

export const stitekTurnusuUcastnikaKomponenta = new Component({
  id: "stitek-turnusu-ucastnika",
  name: "Štítek turnusu účastníka",
  tags: ["účastníci"],
  description: `Zobrazuje název turnusu a datum pro účastníka. Vyžaduje generalVariable: idUcastnika.`,
  html: `
<div id="stitek-turnusu-ucastnika">
  Turnus id_turnusu_ucastnika (datum_od_ucastnika – datum_do_ucastnika)
</div>
`,
  css: `
#stitek-turnusu-ucastnika {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
  padding: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "stitek-turnusu-ucastnika": `SELECT t.id_turnusu AS id_turnusu_ucastnika, strftime('%d. %m.', t.datum_od) AS datum_od_ucastnika, strftime('%d. %m. %Y', t.datum_do) AS datum_do_ucastnika FROM turnusy t JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu WHERE tu.id_ucastnika = idUcastnika LIMIT 1`
  },
  sql_click: {}
});

