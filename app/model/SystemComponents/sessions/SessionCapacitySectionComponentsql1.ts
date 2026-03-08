import { Component } from "~/model/Component";

export const sessionCapacitySectionComponentsql1 = new Component({
    id: "session-capacity-section-sql-1",
    name: "Session Capacity Section (sql-1)",
    tags: ["sessions"],
    description: `Component showing the capacity and participant count for a session with a progress bar.`,
    html: `
        <div class="capacity-section">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">Kapacita</span>
        <span class="text-sm text-gray-600">{{ pocet_ucastniku }}/{{ kapacita }}</span>
      </div>
      <div class="capacity-bar">
        <div class="capacity-fill" style="width: {{ procenta }}%; background-color: {{ barva }}"></div>
      </div>
      <div class="text-xs text-gray-500 mt-1">{{ procenta }}% obsazeno</div>
    </div>
    `,
    css: `.capacity-section {
    margin-bottom: 1.5rem;
  }

  .capacity-bar {
    width: 100%;
    background-color: #e5e7eb;
    border-radius: 9999px;
    height: 0.5rem;
    overflow: hidden;
  }

  .capacity-fill {
    height: 100%;
    transition: all 0.5s ease-out;
    border-radius: 9999px;
  }
`,
    js: ``,
    sql: `SELECT t.kapacita AS kapacita, COUNT(tu.id_ucastnika) AS pocet_ucastniku, CAST(COUNT(tu.id_ucastnika) * 100 / t.kapacita AS INTEGER) AS procenta, CASE WHEN t.kapacita = 0 THEN '#e5e7eb' WHEN COUNT(tu.id_ucastnika) * 100 / t.kapacita >= 90 THEN '#ef4444' WHEN COUNT(tu.id_ucastnika) * 100 / t.kapacita >= 70 THEN '#f59e0b' ELSE '#10b981' END AS barva FROM turnusy t LEFT JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu WHERE t.id_turnusu = ? GROUP BY t.id_turnusu`
});
