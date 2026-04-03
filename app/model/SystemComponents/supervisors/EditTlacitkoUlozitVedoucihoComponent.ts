import { Component } from "~/model/Component";

export const editTlacitkoUlozitVedoucihoKomponenta = new Component({
  id: "edit-btn-ulozit-vedouciho",
  name: "Tlačítko – Upravit vedoucího",
  tags: ["vedoucí"],
  description: "Tlačítko pro uložení změn existujícího vedoucího. Vyžaduje generalVariable: idVedouciho.",

  html: `
<button id="system-edit_btn_ulozit_vedouciho" class="btn-uspech">Upravit vedoucího</button>
`,

  css: `
.btn-uspech { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    upravitVedouciho: `UPDATE vedouci SET jmeno = 'edit_vstup_jmeno_vedouciho', email = 'edit_vstup_email_vedouciho', telefon = 'edit_vstup_telefon_vedouciho', adresa = 'edit_vstup_adresa_vedouciho', vek = edit_vstup_vek_vedouciho WHERE id_vedouciho = idVedouciho`
  },
});
