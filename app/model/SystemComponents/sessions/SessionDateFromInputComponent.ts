import { Component } from "~/model/Component";

export const vstupDatumOdKomponenta = new Component({
  id: "vstup-datum-od",
  name: "Vstup – Datum od",
  tags: ["turnusy"],
  description: "Pole pro zadání počátečního data turnusu.",

  html: `
<div class="form-radek">
  <label>Datum od:</label>
  <input type="date" id="system-vstup_datum_od" />
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
