import { Component } from "~/model/Component";

export const editVstupEmailUcastnikaKomponenta = new Component({
  id: "edit-vstup-email-ucastnika",
  name: "Vstup – Edit Email účastníka",
  tags: ["účastníci"],
  description: "Pole pro úpravu emailu účastníka. Vyžaduje generalVariable: idUcastnika.",

  html: `
<div class="form-radek">
  <label>Email:</label>
  <input type="email" id="system-edit_vstup_email_ucastnika" value="edit_vstup_email_ucastnika" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistEmailUcastnika: `SELECT email AS edit_vstup_email_ucastnika FROM ucastnici WHERE id_ucastnika = idUcastnika`
  },
});
