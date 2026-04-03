import { Component } from "~/model/Component";

export const vstupVekVedoucihoKomponenta = new Component({
  id: "vstup-vek-vedouciho",
  name: "Vstup – Věk vedoucího",
  tags: ["vedoucí"],
  description: "Pole pro zadání věku vedoucího.",

  html: `
<div class="form-radek">
  <label>Věk:</label>
  <input type="number" id="system-vstup_vek_vedouciho" min="1" max="99" placeholder="Zadejte věk" />
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
