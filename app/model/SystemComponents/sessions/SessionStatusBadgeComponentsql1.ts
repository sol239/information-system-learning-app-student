import { Component } from "~/model/Component";

export const sessionStatusBadgeComponentsql1 = new Component({
  id: "session-status-badge-sql-1",
  name: "Session Status Badge (sql-1)",
    tags: ["sessions"],
  description: `Badge component showing the status of a session based on capacity and participant count.`,
  html: `
        <div class="status-badge status-{{ barva }}">
      <span class="status-text">{{ stav }}</span>
    </div>
    `,
  css: `.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-badge.status-red {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .status-badge.status-yellow {
    background-color: #fffbeb;
    color: #d97706;
    border: 1px solid #fde68a;
  }

  .status-badge.status-green {
    background-color: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .status-badge.status-neutral {
    background-color: #f9fafb;
    color: #6b7280;
    border: 1px solid #e5e7eb;
  }

  .status-text {
    white-space: nowrap;
  }
`,
  js: ``,
  sql: `SELECT t.kapacita AS kapacita, COUNT(tu.id_ucastnika) AS pocet_ucastniku, CASE WHEN COUNT(tu.id_ucastnika) >= t.kapacita THEN 'red' WHEN COUNT(tu.id_ucastnika) * 100 / t.kapacita >= 70 THEN 'yellow' WHEN COUNT(tu.id_ucastnika) > 0 THEN 'green' ELSE 'neutral' END AS barva, CASE WHEN COUNT(tu.id_ucastnika) >= t.kapacita THEN 'Obsazeno' WHEN COUNT(tu.id_ucastnika) * 100 / t.kapacita >= 70 THEN 'Skoro plno' WHEN COUNT(tu.id_ucastnika) > 0 THEN 'Volné' ELSE 'Prázdné' END AS stav FROM turnusy t LEFT JOIN turnusy_ucastnici tu ON t.id_turnusu = tu.id_turnusu WHERE t.id_turnusu = ? GROUP BY t.id_turnusu`
});
