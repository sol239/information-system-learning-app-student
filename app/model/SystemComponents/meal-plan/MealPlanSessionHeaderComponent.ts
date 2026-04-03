import { Component } from "~/model/Component";

export const jidelnicekHlavickaTurnusuKomponenta = new Component({
  id: "jidelnicek-hlavicka-turnusu",
  name: "Jídelníček – Hlavička turnusu",
  tags: ["jídelníček"],
  description: `Hlavička turnusu v akordéonu jídelníčku. Vyžaduje generalVariable: idTurnusu.`,
  html: `
<div id="jidelnicek-radek-turnusu">
  <div id="jidelnicek-turnusu-levy">
    <span id="jidelnicek-turnusu-ikona">📅</span>
    <span id="jidelnicek-turnusu-popisek">Turnus idTurnusu</span>
  </div>
  <div id="jidelnicek-turnusu-stitky">
    <span id="jidelnicek-turnusu-datum-stitek">datum_od_jidelnicku – datum_do_jidelnicku</span>
    <span id="jidelnicek-turnusu-jidla-stitek">Unikátních jídel: pocet_unikatnich_jidel</span>
    <span id="jidelnicek-turnusu-porci-stitek">Počet porcí: pocet_porci</span>
  </div>
</div>
`,
  css: `
#jidelnicek-radek-turnusu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

#jidelnicek-turnusu-levy {
  display: flex;
  align-items: center;
  gap: 10px;
}

#jidelnicek-turnusu-ikona {
  font-size: 20px;
}

#jidelnicek-turnusu-popisek {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

#jidelnicek-turnusu-stitky {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

#jidelnicek-turnusu-datum-stitek {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #cffafe;
  color: #0e7490;
  border: 1px solid #a5f3fc;
}

#jidelnicek-turnusu-jidla-stitek {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

#jidelnicek-turnusu-porci-stitek {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ede9fe;
  color: #7c3aed;
  border: 1px solid #ddd6fe;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "jidelnicek-hlavicka-turnusu": `SELECT strftime('%d. %m. %Y', t.datum_od) AS datum_od_jidelnicku, strftime('%d. %m. %Y', t.datum_do) AS datum_do_jidelnicku, COUNT(DISTINCT kj.id_jidla) AS pocet_unikatnich_jidel, (SELECT COUNT(*) FROM ucastnici_jidla uj WHERE DATE(uj.datum_podavani) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do)) + (SELECT COUNT(*) FROM jidla_vedouci jv WHERE DATE(jv.datum_podavani) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do)) AS pocet_porci FROM turnusy t LEFT JOIN kniha_jidel kj ON DATE(kj.datum) BETWEEN DATE(t.datum_od) AND DATE(t.datum_do) WHERE t.id_turnusu = idTurnusu GROUP BY t.id_turnusu`
  },
  sql_click: {}
});

