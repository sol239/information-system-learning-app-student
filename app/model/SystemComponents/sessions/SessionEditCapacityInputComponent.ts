import { Component } from "~/model/Component";

export const editVstupKapacitaKomponenta = new Component({
  id: "edit-vstup-kapacita",
  name: "Vstup – Edit Kapacita",
  tags: ["turnusy"],
  description: "Pole pro úpravu kapacity turnusu. Vyžaduje generalVariable: idTurnusu.",

  html: `
<div class="form-radek">
  <label>Kapacita:</label>
  <input type="number" id="system-edit_vstup_kapacita" value="edit_vstup_kapacita" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistKapacituTurnusu: `SELECT kapacita AS edit_vstup_kapacita FROM turnusy WHERE id_turnusu = idTurnusu`
  },
});
