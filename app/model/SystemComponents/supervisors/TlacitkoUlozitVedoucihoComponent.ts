import { Component } from "~/model/Component";

export const tlacitkoUlozitVedoucihoKomponenta = new Component({
  id: "btn-ulozit-vedouciho",
  name: "Tlačítko – Uložit vedoucího",
  tags: ["vedoucí"],
  description: "Tlačítko pro uložení nového vedoucího.",

  html: `
<button id="system-btn_ulozit_vedouciho" class="btn-uspech">Uložit vedoucího</button>
`,

  css: `
.btn-uspech { background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
`,

  js: ``,
  sql: {},
  sql_click: {
    vlozitVedouciho: `INSERT INTO vedouci (jmeno, email, telefon, adresa, vek) VALUES ('vstup_jmeno_vedouciho', 'vstup_email_vedouciho', 'vstup_telefon_vedouciho', 'vstup_adresa_vedouciho', vstup_vek_vedouciho)`
  },
});
