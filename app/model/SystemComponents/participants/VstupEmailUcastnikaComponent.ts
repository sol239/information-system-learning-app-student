import { Component } from "~/model/Component";

export const vstupEmailUcastnikaKomponenta = new Component({
  id: "vstup-email-ucastnika",
  name: "Vstup – Email účastníka",
  tags: ["účastníci"],
  description: "Pole pro zadání emailu účastníka.",

  html: `
<div class="form-radek">
  <label>Email:</label>
  <input type="email" id="system-vstup_email_ucastnika" placeholder="Zadejte email" />
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
