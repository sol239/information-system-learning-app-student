import { Component } from "~/model/Component";

export const statsMaxParticipantsPerSessionComponent = new Component({
  id: "statistika-max-ucastniku-turnusu",
  name: "Statistika – Max. účastníků na turnus",
  tags: ["dashboard", "statistika", "účastníci", "turnusy"],
  description: `Zobrazuje maximální počet účastníků zapsaných v jednom turnusu.`,
  html: `
  <div id="statistika-max-ucastniku-turnusu-card">
    <div id="statistika-max-ucastniku-turnusu-icon">#</div>
    <div id="statistika-max-ucastniku-turnusu-content">
      <div id="statistika-max-ucastniku-turnusu-number">max_pocet_ucastniku_turnusu</div>
      <div id="statistika-max-ucastniku-turnusu-label">max. účastníků v turnusu</div>
    </div>
  </div>
  `,
  css: `
#statistika-max-ucastniku-turnusu-card {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}

#statistika-max-ucastniku-turnusu-icon {
  font-size: 32px;
  font-weight: 700;
  color: #111111;
}

#statistika-max-ucastniku-turnusu-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#statistika-max-ucastniku-turnusu-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "statistika-max-ucastniku-turnusu": `SELECT COALESCE(MAX(participant_count), 0) AS max_pocet_ucastniku_turnusu FROM (SELECT COUNT(tu.id_ucastnika) AS participant_count FROM turnusy t LEFT JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu GROUP BY t.id_turnusu)`
  },
  sql_click: {}
});
