import { Component } from "~/model/Component";

/**
 * Session Status Badge — General Variable version
 *
 * Shows a coloured badge (Obsazeno / Skoro plno / Volné / Prázdné)
 * for a single session.  The session to show is passed via a general
 * variable called "sessionId".
 *
 * ─── How each part works ────────────────────────────────────────────
 *
 *  SQL  – asks the database for the capacity and the current participant
 *         count of the session.  {{ sessionId }} is swapped with the
 *         actual session number before the query is run.
 *
 *  JS   – reads 'kapacita' and 'pocet_ucastniku' (both come from SQL)
 *         and decides on a colour ('barva') and a human-readable label
 *         ('label').
 *
 *  HTML – shows the badge using {{ barva }} for the CSS class and
 *         {{ label }} for the displayed text.
 *
 *  CSS  – colours the badge based on the class set in HTML.
 */

export const sessionStatusBadgeGenvarComponent = new Component({
  id: "session-status-badge-genvar",
  name: "Session Status Badge",
  tags: ["sessions"],
  description: "Coloured capacity badge for one session.  Pass the session id via the 'sessionId' general variable.",

  // ─── 1. SQL ────────────────────────────────────────────────────────
  // {{ sessionId }} is replaced with the real value before the query runs.
  // The query returns two columns: 'kapacita' (max seats) and
  // 'pocet_ucastniku' (how many participants are already signed up).
  sql: `
  SELECT capacity FROM turnusy WHERE id_turnusu = sessionId;
  SELECT COUNT(*) as count FROM turnusy_účastníci WHERE id_turnusu = sessionId;`,

  // ─── 2. JS ────────────────────────────────────────────────────────
  // 'kapacita' and 'pocet_ucastniku' arrive as arrays from the SQL above.
  // We grab the first (and only) row with [0].
  js: `const count = pocet_ucastniku[0] ?? 0;
const cap   = kapacita[0] ?? 1;

// Pick a colour based on how full the session is
const barva =
    count >= cap             ? "red"
  : count * 100 / cap >= 70  ? "yellow"
  : count > 0                ? "green"
  :                            "neutral";

// Pick a human-readable status word
const stav =
    count >= cap             ? "Obsazeno"
  : count * 100 / cap >= 70  ? "Skoro plno"
  : count > 0                ? "Volné"
  :                            "Prázdné";

// Build the final text shown in the badge
const label = stav + " (" + count + "/" + cap + ")";`,

  // ─── 3. HTML ──────────────────────────────────────────────────────
  // {{ barva }} sets the colour class; {{ label }} shows the text.
  html: `<div class="badge badge-{{ barva }}">{{ label }}</div>`,

  // ─── 4. CSS ───────────────────────────────────────────────────────
  // One base style + four colour variants that match the 'barva' values.
  css: `.badge {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}
.badge-red     { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.badge-yellow  { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
.badge-green   { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.badge-neutral { background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; }`,
});
