import { Component } from "~/model/Component";

export const editTlacitkoUlozitKomponenta = new Component({
  id: "edit-btn-ulozit",
  name: "Tlačítko – Upravit turnus",
  tags: ["turnusy"],
  description: "Tlačítko pro uložení změn existujícího turnusu. Vyžaduje generalVariable: idTurnusu.",

  html: `
<button id="system-edit_btn_ulozit" class="btn-uspech">Upravit turnus</button>
`,

  css: `
.btn-uspech { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    upravitTurnus: `UPDATE turnusy SET datum_od = DATE('edit_vstup_datum_od'), datum_do = DATE('edit_vstup_datum_do'), kapacita = edit_vstup_kapacita WHERE id_turnusu = idTurnusu`
  },
});
