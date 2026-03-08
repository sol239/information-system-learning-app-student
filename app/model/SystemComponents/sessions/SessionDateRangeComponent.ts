import { Component } from "~/model/Component";

export const sessionDateRangeComponent = new Component({
    id: "session-date-range",
    name: "Session Date Range",
    tags: ["sessions"],
    description: `Component showing the date range for a session.`,
    html: `
        <div class="date-range">
      <span class="calendar-icon">📅</span>
      <span class="date-text">{{ datum_od }} — {{ datum_do }}</span>
    </div>
    `,
    css: `.date-range {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    background-color: #f3f4f6;
  }

  .calendar-icon {
    font-size: 1rem;
  }

  .date-text {
    white-space: nowrap;
  }
`,
    js: ``,
    sql: `SELECT substr(datum_od,9,2)||'.'||substr(datum_od,6,2)||'.'||substr(datum_od,1,4) AS datum_od, substr(datum_do,9,2)||'.'||substr(datum_do,6,2)||'.'||substr(datum_do,1,4) AS datum_do FROM turnusy WHERE id_turnusu = ?`
});
