import { Component } from "~/model/Component";

export const editTlacitkoUlozitJidloKomponenta = new Component({
  id: "edit-btn-ulozit-jidlo",
  name: "Tlačítko – Upravit jídlo",
  tags: ["jídla"],
  description: "Tlačítko pro uložení změn existujícího jídla. Vyžaduje generalVariable: idJidla.",

  html: `
<button id="system-edit_btn_ulozit_jidlo" class="btn-uspech">Upravit jídlo</button>
`,

  css: `
.btn-uspech { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    upravitJidlo: `UPDATE jidla SET jmeno = 'edit_vstup_nazev_jidla', doba_podavani = 'edit_vstup_doba_podavani' WHERE id_jidla = idJidla`
  },
});
