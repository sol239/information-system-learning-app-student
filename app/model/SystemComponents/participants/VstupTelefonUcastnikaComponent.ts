import { Component } from "~/model/Component";

export const vstupTelefonUcastnikaKomponenta = new Component({
  id: "vstup-telefon-ucastnika",
  name: "Vstup – Telefon účastníka",
  tags: ["účastníci"],
  description: "Pole pro zadání telefonu účastníka.",

  html: `
<div class="form-radek">
  <label>Telefon:</label>
  <input type="tel" id="system-vstup_telefon_ucastnika" placeholder="Zadejte telefon" />
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
