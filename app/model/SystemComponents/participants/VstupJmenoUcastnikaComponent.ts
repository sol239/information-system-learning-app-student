import { Component } from "~/model/Component";

export const vstupJmenoUcastnikaKomponenta = new Component({
  id: "vstup-jmeno-ucastnika",
  name: "Vstup – Jméno účastníka",
  tags: ["účastníci"],
  description: "Pole pro zadání jména účastníka.",

  html: `
<div class="form-radek">
  <label>Jméno:</label>
  <input type="text" id="system-vstup_jmeno_ucastnika" placeholder="Zadejte jméno" />
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
