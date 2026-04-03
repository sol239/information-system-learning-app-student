import { Component } from "~/model/Component";

export const editTlacitkoUlozitUcastnikaKomponenta = new Component({
  id: "edit-btn-ulozit-ucastnika",
  name: "Tlačítko – Upravit účastníka",
  tags: ["účastníci"],
  description: "Tlačítko pro uložení změn existujícího účastníka. Vyžaduje generalVariable: idUcastnika.",

  html: `
<button id="system-edit_btn_ulozit_ucastnika" class="btn-uspech">Upravit účastníka</button>
`,

  css: `
.btn-uspech { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    upravitUcastnika: `UPDATE ucastnici SET jmeno = 'edit_vstup_jmeno_ucastnika', email = 'edit_vstup_email_ucastnika', telefon = 'edit_vstup_telefon_ucastnika', adresa = 'edit_vstup_adresa_ucastnika', vek = edit_vstup_vek_ucastnika WHERE id_ucastnika = idUcastnika`
  },
});
