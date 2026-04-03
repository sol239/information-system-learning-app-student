import { Component } from "~/model/Component";

export const editVstupTelefonUcastnikaKomponenta = new Component({
  id: "edit-vstup-telefon-ucastnika",
  name: "Vstup – Edit Telefon účastníka",
  tags: ["účastníci"],
  description: "Pole pro úpravu telefonu účastníka. Vyžaduje generalVariable: idUcastnika.",

  html: `
<div class="form-radek">
  <label>Telefon:</label>
  <input type="tel" id="system-edit_vstup_telefon_ucastnika" value="edit_vstup_telefon_ucastnika" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistTelefonUcastnika: `SELECT telefon AS edit_vstup_telefon_ucastnika FROM ucastnici WHERE id_ucastnika = idUcastnika`
  },
});
