import { Component } from "~/model/Component";

export const editVstupAdresaVedoucihoKomponenta = new Component({
  id: "edit-vstup-adresa-vedouciho",
  name: "Vstup – Edit Adresa vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro úpravu adresy vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<div class="form-radek">
  <label>Adresa:</label>
  <input type="text" id="system-edit_vstup_adresa_vedouciho" value="edit_vstup_adresa_vedouciho" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistAdresuVedouciho: `SELECT adresa AS edit_vstup_adresa_vedouciho FROM vedouci WHERE id_vedouciho = idVedouciho`
  },
});
