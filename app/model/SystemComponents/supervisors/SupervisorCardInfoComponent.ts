import { Component } from "~/model/Component";

export const supervisorCardInfoComponent = new Component({
  id: "supervisor-card-info",
  name: "Supervisor Card Info",
  tags: ["supervisors"],
  description: `Card showing name, age badge, email, phone and address for a supervisor. Requires generalVariable: supervisorId.`,
  html: `
<div id="sup-card">
  <div id="sup-card-header">
    <span id="sup-name">jmeno</span>
    <span id="sup-age-badge">Age: vek</span>
  </div>
  <div id="sup-email-row">
    <span id="sup-email-icon">✉️</span>
    <span id="sup-email">email</span>
  </div>
  <div id="sup-phone-row">
    <span id="sup-phone-icon">📞</span>
    <span id="sup-phone">telefon</span>
  </div>
  <div id="sup-address-row">
    <span id="sup-address-icon">📍</span>
    <span id="sup-address">adresa</span>
  </div>
</div>
`,
  css: `
#sup-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

#sup-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

#sup-name {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

#sup-age-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ede9fe;
  color: #7c3aed;
  white-space: nowrap;
  flex-shrink: 0;
}

#sup-email-row, #sup-phone-row, #sup-address-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}

#sup-email-icon, #sup-phone-icon, #sup-address-icon {
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "supervisor-card-info": `SELECT v.jmeno, v.vek, v.email, v.telefon, v.adresa FROM vedouci v WHERE v.id_vedouciho = supervisorId`
  },
  sql_click: {}
});

