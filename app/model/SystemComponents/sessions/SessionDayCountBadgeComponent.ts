import { Component } from "~/model/Component";

export const sessionDayCountBadgeComponent = new Component({
    id: "session-day-count-badge",
    name: "Session Day Count Badge",
    tags: ["sessions"],
    description: `Badge showing the count of days for a session.`,
    html: `
      <div class="badge primary medium">
        <span class="icon">📅</span>
        <span>{{ pocet_dni }} dní</span>
      </div>
    `,
    css: `.badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border-radius: 0.5rem;
      font-weight: bold;
      cursor: pointer;
    }

    .badge.primary {
      background-color: #10b981; /* Green */
      color: white;
    }

    .badge.small {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }

    .badge.medium {
      font-size: 1rem;         /* medium text */
      padding: 0.4rem 0.75rem; /* medium padding */
    }

    .badge.large {
      font-size: 1.25rem;
      padding: 0.5rem 1rem;
    }

    .icon {
      font-size: 1.2rem; /* balanced icon size */
    }
    `,
    js: ``,
    sql: `SELECT CAST(julianday(substr(datum_do,1,10)) - julianday(substr(datum_od,1,10)) + 1 AS INTEGER) AS pocet_dni FROM turnusy WHERE id_turnusu = ?`
});
