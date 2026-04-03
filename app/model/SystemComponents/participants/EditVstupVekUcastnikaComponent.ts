import { Component } from "~/model/Component";

export const editVstupVekUcastnikaKomponenta = new Component({
  id: "edit-vstup-vek-ucastnika",
  name: "Vstup – Edit Věk účastníka",
  tags: ["účastníci"],
  description: "Pole pro úpravu věku účastníka. Vyžaduje generalVariable: idUcastnika.",

  html: `
<div class="form-radek">
  <label>Věk:</label>
  <input type="number" id="system-edit_vstup_vek_ucastnika" min="1" max="99" value="edit_vstup_vek_ucastnika" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistVekUcastnika: `SELECT vek AS edit_vstup_vek_ucastnika FROM ucastnici WHERE id_ucastnika = idUcastnika`
  },
});
