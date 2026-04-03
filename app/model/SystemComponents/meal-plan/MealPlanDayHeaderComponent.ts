import { Component } from "~/model/Component";

export const jidelnicekHlavickaDneKomponenta = new Component({
  id: "jidelnicek-hlavicka-dne",
  name: "Jídelníček – Hlavička dne",
  tags: ["jídelníček"],
  description: `Hlavička dne v akordéonu jídelníčku. Vyžaduje generalVariable: datumDne (formát YYYY-MM-DD).`,
  html: `
<div id="jidelnicek-radek-dne">
  <div id="jidelnicek-dne-levy">
    <span id="jidelnicek-dne-ikona">📅</span>
    <span id="jidelnicek-dne-datum">zobrazeni_dne</span>
  </div>
  <div id="jidelnicek-dne-stitky">
    <span id="jidelnicek-dne-jidla-stitek">Unikátních jídel: pocet_unikatnich_jidel_dne</span>
    <span id="jidelnicek-dne-porci-stitek">Počet porcí: pocet_porci_dne</span>
  </div>
</div>
`,
  css: `
#jidelnicek-radek-dne {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

#jidelnicek-dne-levy {
  display: flex;
  align-items: center;
  gap: 10px;
}

#jidelnicek-dne-ikona {
  font-size: 16px;
}

#jidelnicek-dne-datum {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

#jidelnicek-dne-stitky {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

#jidelnicek-dne-jidla-stitek {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

#jidelnicek-dne-porci-stitek {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
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
    "jidelnicek-hlavicka-dne": `SELECT strftime('%d. %m. %Y', 'datumDne') AS zobrazeni_dne, COUNT(DISTINCT id_jidla) AS pocet_unikatnich_jidel_dne, (SELECT COUNT(*) FROM ucastnici_jidla WHERE datum_podavani = 'datumDne') + (SELECT COUNT(*) FROM jidla_vedouci WHERE datum_podavani = 'datumDne') AS pocet_porci_dne FROM kniha_jidel WHERE datum = 'datumDne'`
  },
  sql_click: {}
});

