import { Component } from "~/model/Component";

export const sessionStatusBadgeComponentsql2 = new Component({
  id: "session-status-badge-sql-2",
  name: "Session Status Badge (sql-2)",
    tags: ["sessions"],
  description: `Badge component showing the status of a session based on capacity and participant count.`,
  html: `
        <div class="status-badge status-{{ color }}">
      <span class="status-text">{{ status }}</span>
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
  js: `if (capacity === 0) return 0; return Math.round((participantCount / capacity) * 100);`,
  sql: `SELECT COUNT(*) as count FROM turnusy_ucastnici WHERE id_turnusu = ?`
});
