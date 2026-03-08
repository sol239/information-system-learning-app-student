import { Component } from "~/model/Component";

export const sessionDeleteButtonComponentsql2 = new Component({
  id: "session-delete-button-sql-2",
  name: "Session Delete Button (sql-2)",
  tags: ["sessions"],
  description: `Button component for deleting a session with confirmation and proper cleanup.`,
  html: `
        <button class="delete-button" onclick="handleDelete()">
      <span class="delete-icon">🗑️</span>
      <span class="delete-text">{{ deleteLabel }}</span>
    </button>
    `,
  css: `  .delete-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #dc2626;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .delete-button:hover {
    background-color: #fee2e2;
    border-color: #b91c1c;
    color: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .delete-button:active {
    transform: translateY(0);
  }

  .delete-icon {
    font-size: 1rem;
  }

  .delete-text {
    white-space: nowrap;
  }
`,
  js: ``,
  sql: `DELETE FROM vedouci_turnusy WHERE id_turnusu = ?`
});
