import { Component } from "~/model/Component";

export const participantCardInfoComponent = new Component({
  id: "participant-card-info",
  name: "Participant Card Info",
  tags: ["participants"],
  description: `Card showing name, age badge, email, session info, phone and address for a participant. Requires generalVariable: participantId.`,
  html: `
<div id="ptcp-card">
  <div id="ptcp-card-header">
    <span id="ptcp-name">jmeno</span>
    <span id="ptcp-age-badge">Age: vek</span>
  </div>
  <div id="ptcp-email-row">
    <span id="ptcp-email-icon">✉️</span>
    <span id="ptcp-email">email</span>
  </div>
  <div id="ptcp-phone-row">
    <span id="ptcp-phone-icon">📞</span>
    <span id="ptcp-phone">telefon</span>
  </div>
  <div id="ptcp-address-row">
    <span id="ptcp-address-icon">📍</span>
    <span id="ptcp-address">adresa</span>
  </div>
</div>
`,
  css: `
#ptcp-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

#ptcp-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

#ptcp-name {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

#ptcp-age-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background-color: #cffafe;
  color: #0e7490;
  white-space: nowrap;
  flex-shrink: 0;
}

#ptcp-email-row, #ptcp-phone-row, #ptcp-address-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}

#ptcp-email-icon, #ptcp-phone-icon, #ptcp-address-icon {
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "participant-card-info": `SELECT u.jmeno, u.vek, u.email, u.telefon, u.adresa FROM ucastnici u WHERE u.id_ucastnika = participantId`
  },
  sql_click: {}
});

