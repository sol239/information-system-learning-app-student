import { Component } from "~/model/Component";

export const jidelnicekLideJidlaKomponenta = new Component({
  id: "jidelnicek-lide-jidla",
  name: "Jídelníček – Lidé u jídla",
  tags: ["jídelníček"],
  description: `Účastníci a vedoucí, kteří měli jídlo v daný den. Vyžaduje generalVariables: idJidla, datumDne.`,
  html: `
<div id="jidelnicek-sekce-lidi">
  <div id="jidelnicek-sekce-ucastniku">
    <div id="jidelnicek-hlavicka-ucastniku">
      <span id="jidelnicek-ikona-ucastniku">🧑‍🤝‍🧑</span>
      <span id="jidelnicek-titulek-ucastniku">Účastníci (pocet_ucastniku_jidla)</span>
    </div>
    <div id="jidelnicek-seznam-ucastniku">html_ucastniku_jidla</div>
  </div>
  <div id="jidelnicek-sekce-vedoucich">
    <div id="jidelnicek-hlavicka-vedoucich">
      <span id="jidelnicek-ikona-vedoucich">👥</span>
      <span id="jidelnicek-titulek-vedoucich">Vedoucí (pocet_vedoucich_jidla)</span>
    </div>
    <div id="jidelnicek-seznam-vedoucich">html_vedoucich_jidla</div>
  </div>
</div>
`,
  css: `
#jidelnicek-sekce-lidi {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

#jidelnicek-sekce-ucastniku, #jidelnicek-sekce-vedoucich {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#jidelnicek-hlavicka-ucastniku, #jidelnicek-hlavicka-vedoucich {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

#jidelnicek-seznam-ucastniku, #jidelnicek-seznam-vedoucich {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.radek-osoby-jidelnicku {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: 10px;
}

.avatar-ucastnika-jidelnicku {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background-color: #dbeafe;
  color: #1d4ed8;
  flex-shrink: 0;
}

.avatar-vedouciho-jidelnicku {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background-color: #ede9fe;
  color: #7c3aed;
  flex-shrink: 0;
}

.jmeno-osoby-jidelnicku {
  font-size: 13px;
  font-weight: 600;
  color: #1d4ed8;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "jidelnicek-lide-jidla": `SELECT (SELECT COUNT(*) FROM ucastnici_jidla WHERE id_jidla = idJidla AND datum_podavani = 'datumDne') AS pocet_ucastniku_jidla, (SELECT COALESCE(GROUP_CONCAT('<div class="radek-osoby-jidelnicku"><div class="avatar-ucastnika-jidelnicku">' || SUBSTR(u.jmeno,1,1) || SUBSTR(u.jmeno,INSTR(u.jmeno,' ')+1,1) || '</div><div class="jmeno-osoby-jidelnicku">' || u.jmeno || '</div></div>', ''), '') FROM ucastnici u JOIN ucastnici_jidla uj ON u.id_ucastnika = uj.id_ucastnika WHERE uj.id_jidla = idJidla AND uj.datum_podavani = 'datumDne') AS html_ucastniku_jidla, (SELECT COUNT(*) FROM jidla_vedouci WHERE id_jidla = idJidla AND datum_podavani = 'datumDne') AS pocet_vedoucich_jidla, (SELECT COALESCE(GROUP_CONCAT('<div class="radek-osoby-jidelnicku"><div class="avatar-vedouciho-jidelnicku">' || SUBSTR(v.jmeno,1,1) || SUBSTR(v.jmeno,INSTR(v.jmeno,' ')+1,1) || '</div><div class="jmeno-osoby-jidelnicku">' || v.jmeno || '</div></div>', ''), '') FROM vedouci v JOIN jidla_vedouci jv ON v.id_vedouciho = jv.id_vedouciho WHERE jv.id_jidla = idJidla AND jv.datum_podavani = 'datumDne') AS html_vedoucich_jidla`
  },
  sql_click: {}
});

