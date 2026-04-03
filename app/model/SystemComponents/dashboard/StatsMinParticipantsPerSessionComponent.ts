import { Component } from "~/model/Component";

export const statsMinParticipantsPerSessionComponent = new Component({
  id: "statistika-min-ucastniku-turnusu",
  name: "Statistika – Min. účastníků na turnus",
  tags: ["dashboard", "statistika", "účastníci", "turnusy"],
  description: `Zobrazuje minimální počet účastníků zapsaných v jednom turnusu.`,
  html: `
  <div id="statistika-min-ucastniku-turnusu-card">
    <div id="statistika-min-ucastniku-turnusu-icon">MIN</div>
    <div id="statistika-min-ucastniku-turnusu-content">
      <div id="statistika-min-ucastniku-turnusu-number">min_pocet_ucastniku_turnusu</div>
      <div id="statistika-min-ucastniku-turnusu-label">min. účastníků v turnusu</div>
    </div>
  </div>
  `,
  css: `
#statistika-min-ucastniku-turnusu-card {
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

#statistika-min-ucastniku-turnusu-icon {
  font-size: 22px;
  font-weight: 700;
  color: #111111;
}

#statistika-min-ucastniku-turnusu-number {
  font-size: 28px;
  font-weight: bold;
  color: #111111;
}

#statistika-min-ucastniku-turnusu-label {
  font-size: 13px;
  color: #666666;
  margin-top: 4px;
}
`,
  js: ``,
  js_click: ``,
  sql: {
    "statistika-min-ucastniku-turnusu": `SELECT COALESCE(MIN(participant_count), 0) AS min_pocet_ucastniku_turnusu FROM (SELECT COUNT(tu.id_ucastnika) AS participant_count FROM turnusy t LEFT JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu GROUP BY t.id_turnusu)`
  },
  sql_click: {}
});
