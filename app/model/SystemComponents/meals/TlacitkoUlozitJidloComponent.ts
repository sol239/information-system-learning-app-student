import { Component } from "~/model/Component";

export const tlacitkoUlozitJidloKomponenta = new Component({
  id: "btn-ulozit-jidlo",
  name: "Tlačítko – Uložit jídlo",
  tags: ["jídla"],
  description: "Tlačítko pro uložení nového jídla.",

  html: `
<button id="system-btn_ulozit_jidlo" class="btn-uspech">Uložit jídlo</button>
`,

  css: `
.btn-uspech { background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    vlozitJidlo: `INSERT INTO jidla (jmeno, doba_podavani) VALUES ('vstup_nazev_jidla', 'vstup_doba_podavani')`
  },
});
