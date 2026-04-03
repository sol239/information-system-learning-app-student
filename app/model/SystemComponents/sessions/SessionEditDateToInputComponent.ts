import { Component } from "~/model/Component";

export const editVstupDatumDoKomponenta = new Component({
  id: "edit-vstup-datum-do",
  name: "Vstup – Edit Datum do",
  tags: ["turnusy"],
  description: "Pole pro úpravu koncového data turnusu. Vyžaduje generalVariable: idTurnusu.",

  html: `
<div class="form-radek">
  <label>Datum do:</label>
  <input type="date" id="system-edit_vstup_datum_do" value="edit_vstup_datum_do" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistDatumDoTurnusu: `SELECT DATE(datum_do) AS edit_vstup_datum_do FROM turnusy WHERE id_turnusu = idTurnusu`
  },
});
