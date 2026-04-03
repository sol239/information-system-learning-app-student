import { Component } from "~/model/Component";

export const editVstupJmenoVedoucihoKomponenta = new Component({
  id: "edit-vstup-jmeno-vedouciho",
  name: "Vstup – Edit Jméno vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro úpravu jména vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<div class="form-radek">
  <label>Jméno:</label>
  <input type="text" id="system-edit_vstup_jmeno_vedouciho" value="edit_vstup_jmeno_vedouciho" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistJmenoVedouciho: `SELECT jmeno AS edit_vstup_jmeno_vedouciho FROM vedouci WHERE id_vedouciho = idVedouciho`
  },
});
