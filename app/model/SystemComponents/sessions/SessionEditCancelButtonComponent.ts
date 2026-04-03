import { Component } from "~/model/Component";

export const editTlacitkoZrusitKomponenta = new Component({
  id: "edit-btn-zrusit",
  name: "Tlačítko – Zrušit editaci turnusu",
  tags: ["turnusy"],
  description: "Tlačítko pro zrušení editace turnusu.",

  html: `
<button id="system-edit_btn_zrusit" class="btn-sekundarni">Zrušit</button>
`,

  css: `
.btn-sekundarni { background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
});
