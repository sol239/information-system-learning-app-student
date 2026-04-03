import { Component } from "~/model/Component";

export const editVstupTelefonVedoucihoKomponenta = new Component({
  id: "edit-vstup-telefon-vedouciho",
  name: "Vstup – Edit Telefon vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro úpravu telefonu vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<div class="form-radek">
  <label>Telefon:</label>
  <input type="tel" id="system-edit_vstup_telefon_vedouciho" value="edit_vstup_telefon_vedouciho" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistTelefonVedouciho: `SELECT telefon AS edit_vstup_telefon_vedouciho FROM vedouci WHERE id_vedouciho = idVedouciho`
  },
});
