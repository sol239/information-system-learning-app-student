import { Component } from "~/model/Component";

export const tlacitkoUlozitKomponenta = new Component({
  id: "btn-ulozit",
  name: "Tlačítko – Uložit turnus",
  tags: ["turnusy"],
  description: "Tlačítko pro uložení nového turnusu.",

  html: `
<button id="system-btn_ulozit" class="btn-uspech">Uložit turnus</button>
`,

  css: `
.btn-uspech { background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    insertTurnus: `INSERT INTO turnusy (datum_od, datum_do, kapacita) VALUES (DATE('vstup_datum_od'), DATE('vstup_datum_do'), vstup_kapacita)`
  },
});
