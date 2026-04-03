import { Component } from "~/model/Component";

export const tlacitkoZrusitKomponenta = new Component({
  id: "btn-zrusit",
  name: "Tlačítko – Zrušit",
  tags: ["turnusy"],
  description: "Tlačítko pro zrušení formuláře nového turnusu.",

  html: `
<button id="system-btn_zrusit" class="btn-sekundarni">Zrušit</button>
`,

  css: `
.btn-sekundarni { background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
});
