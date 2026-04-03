import { Component } from "~/model/Component";

export const editVstupVekVedoucihoKomponenta = new Component({
  id: "edit-vstup-vek-vedouciho",
  name: "Vstup – Edit Věk vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro úpravu věku vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<div class="form-radek">
  <label>Věk:</label>
  <input type="number" id="system-edit_vstup_vek_vedouciho" min="1" max="99" value="edit_vstup_vek_vedouciho" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistVekVedouciho: `SELECT vek AS edit_vstup_vek_vedouciho FROM vedouci WHERE id_vedouciho = idVedouciho`
  },
});
