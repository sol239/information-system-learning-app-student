import { Component } from "~/model/Component";

export const editVstupEmailVedoucihoKomponenta = new Component({
  id: "edit-vstup-email-vedouciho",
  name: "Vstup – Edit Email vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro úpravu emailu vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<div class="form-radek">
  <label>Email:</label>
  <input type="email" id="system-edit_vstup_email_vedouciho" value="edit_vstup_email_vedouciho" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {
    nacistEmailVedouciho: `SELECT email AS edit_vstup_email_vedouciho FROM vedouci WHERE id_vedouciho = idVedouciho`
  },
});
