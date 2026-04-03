import { Component } from "~/model/Component";

export const jidelnicekRadekJidlaKomponenta = new Component({
  id: "jidelnicek-radek-jidla",
  name: "Jídelníček – Řádek jídla",
  tags: ["jídelníček"],
  description: `Řádek jídla v akordéonu jídelníčku s názvem, alergeny a dobou podávání. Vyžaduje generalVariable: idJidla.`,
  html: `
<div id="jidelnicek-radek-jidla-kontejner">
  <div id="jidelnicek-jidlo-levy">
    <span id="jidelnicek-jidlo-ikona">🍽️</span>
    <div id="jidelnicek-jidlo-info">
      <span id="jidelnicek-jidlo-nazev">nazev_jidla_jidelnicku</span>
      <div id="jidelnicek-jidlo-alergeny">html_alergenu_jidelnicku</div>
    </div>
  </div>
  <span id="jidelnicek-jidlo-doba-stitek">doba_podavani_jidelnicku</span>
</div>
`,
  css: `
#jidelnicek-radek-jidla-kontejner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

#jidelnicek-jidlo-levy {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

#jidelnicek-jidlo-ikona {
  font-size: 20px;
  padding-top: 2px;
  flex-shrink: 0;
}

#jidelnicek-jidlo-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#jidelnicek-jidlo-nazev {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

#jidelnicek-jidlo-alergeny {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pilulka-alergenu-jidelnicku {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  background-color: #fce7f3;
  border: 1px solid #fbcfe8;
  color: #be185d;
}

#jidelnicek-jidlo-doba-stitek {
  display: inline-flex;
  align-items: center;
  padding: 5px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  background-color: #eab308;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "jidelnicek-radek-jidla": `SELECT j.jmeno AS nazev_jidla_jidelnicku, j.doba_podavani AS doba_podavani_jidelnicku, COALESCE(GROUP_CONCAT('<span class="pilulka-alergenu-jidelnicku">' || a.jmeno || '</span>', ''), '') AS html_alergenu_jidelnicku FROM jidla j LEFT JOIN jidla_alergeny ja ON j.id_jidla = ja.id_jidla LEFT JOIN alergeny a ON ja.id_alergenu = a.id_alergenu WHERE j.id_jidla = idJidla GROUP BY j.id_jidla, j.jmeno, j.doba_podavani`
  },
  sql_click: {}
});

