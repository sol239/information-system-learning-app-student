import { Component } from "~/model/Component";

export const tlacitkoUlozitUcastnikaKomponenta = new Component({
  id: "btn-ulozit-ucastnika",
  name: "Tlačítko – Uložit účastníka",
  tags: ["účastníci"],
  description: "Tlačítko pro uložení nového účastníka.",

  html: `
<button id="system-btn_ulozit_ucastnika" class="btn-uspech">Uložit účastníka</button>
`,

  css: `
.btn-uspech { background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    vlozitUcastnika: `INSERT INTO ucastnici (jmeno, email, telefon, adresa, vek) VALUES ('vstup_jmeno_ucastnika', 'vstup_email_ucastnika', 'vstup_telefon_ucastnika', 'vstup_adresa_ucastnika', vstup_vek_ucastnika)`
  },
});
