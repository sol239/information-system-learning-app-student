import { Component } from "~/model/Component";

export const vstupTelefonVedoucihoKomponenta = new Component({
  id: "vstup-telefon-vedouciho",
  name: "Vstup – Telefon vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro zadání telefonu vedoucího.",

  html: `
<div class="form-radek">
  <label>Telefon:</label>
  <input type="tel" id="system-vstup_telefon_vedouciho" placeholder="Zadejte telefon" />
</div>
`,

  css: `
.form-radek { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.form-radek label { font-size: 13px; font-weight: 600; color: #374151; }
.form-radek input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
`,

  js: ``,
  sql: {},
});
